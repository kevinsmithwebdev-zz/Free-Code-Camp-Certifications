var express = require('express')
var router = express.Router()
var ensure = require('connect-ensure-login')
var Image = require('../models/image')
var probe = require('probe-image-size');

const EMPTY_IMG_URL = '/images/image-not-found.png'


router.get('/add', ensure.ensureLoggedIn(), function(req, res) {
  res.render('images/add', { user: req.user, encodedUser: encodeURIComponent(JSON.stringify(req.user)) });
});

router.post('/add', ensure.ensureLoggedIn(), function(req, res) {
  probe(req.body.url)
    .then(result => {
      create(req.body.url)
    })
    .catch(err => {
      create(EMPTY_IMG_URL)
    }) // probe


  function create(url) {
    var imageObj = {
      title: req.body.title,
      url: url,
      ownerName: req.user.displayName,
      ownerId: req.user.id,
      date: new Date(),
      likes: [],
      numLinks: 0
    };
    Image.createImage(imageObj, function(err) {
      if (err) {
        res.status(409).end();
        throw err;
      } else {
        res.render('index', { user: req.user, encodedUser: encodeURIComponent(JSON.stringify(req.user)), isLoggedIn: true });
      }
    });
  } // create(url)
});

//*************

router.get('/wall/recent', function(req, res) {
  Image.find().sort({ "date": -1 }).exec(function(err, data) {
   if (err) throw err;
     res.send(data)
  });
});

router.get('/wall/:userId', function(req, res) {
  Image.find({ ownerId: req.params.userId }, function(err, data) {
    if (err) throw err;
      res.send(data)
  });
});

router.post('/like/:imageId', ensure.ensureLoggedIn(), function(req, res) {
  var imageId = req.params.imageId;
  Image.findById(imageId, function(err, data) {
    if (err) {
      console.error('Image record "' + imageId + '" not found.')
      res.end();
    } else {
      var index = data.likes.indexOf(req.user.id);
      if (index==-1) {
        data.likes.push(req.user.id);
      } else {
        data.likes.splice(index, 1);
      }
      Image.findOneAndUpdate({ _id: imageId }, {  likes: data.likes }, function(err, data) {
        if (err) console.error(err);
        res.end();
      })
    }
  })
});

router.get('/:imageId', function(req, res) {
  Image.findById( req.params.imageId, function(err, data) {
    if (err) throw err;
    res.json(data)
  });
});

router.delete('/:imageId', ensure.ensureLoggedIn(), function(req, res) {
  Image.findByIdAndRemove(req.params.imageId, function (err, image) {
    if (err) throw err;
    res.end()
  });
});

router.post('/relink', ensure.ensureLoggedIn(), function(req, res) {
  Image.findOne({ ownerId: req.user.id, url: req.body.url, title: req.body.title }, function(err, data) {
    if (err) throw err;
    if (data) {
      res.json({ duplicate: 'This image and title already stored on ' + req.user.displayName + '\'s wall.' });
    } else {

      Image.findByIdAndUpdate(req.body.originalImageId, { $inc: {"numLinks": 1 }}, function(err, data) {
        if (err) throw err;
        var imageObj = {
          title: req.body.title,
          url: req.body.url,
          ownerName: req.user.displayName,
          ownerId: req.user.id,
          date: new Date(),
          likes: [],
          numLinks: 0
        }
        Image.createImage(imageObj, function(err) {
          if (err) {
            res.status(409).end()
            throw err;
          } else {
            res.send({ numLinks: data.numLinks })
          }
        })
      })
    }
  })
});

module.exports = router;
