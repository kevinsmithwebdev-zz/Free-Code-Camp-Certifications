var express = require('express');
var passport = require('passport');
var router = express.Router();
var yelp = require('yelp-fusion');
var request=require('request');

var Soiree = require('../models/soiree');
var User = require('../models/user');

const YELP_FUSION_API_KEY = process.env.YELP_FUSION_API_KEY;
const IPINFO_TOKEN = process.env.IPINFO_TOKEN;

const SEARCH_CATEGORIES = 'nightlife';

//***************************************

router.get('/search', User.ensureAuthenticated, function(req, res) {
  var searchRequest = {
    categories: SEARCH_CATEGORIES,
    location: req.query.loc,
    offset: req.query.offset,
    limit: req.query.pages
  };

  const client = yelp.client(YELP_FUSION_API_KEY)
  client.search(searchRequest).then(response => {
    res.json(response.jsonBody.businesses);
  },
  function() {
    res.json({ error: 'Nothing returned for that search.'});
  });

});

//***************************************

router.get('/soirees/:adjustedDateStamp/:venueName', User.ensureAuthenticated, function(req, res) {
  Soiree.find({ yelpId: req.params.venueName }, function(err, soirees) {
    if (err) throw err;
    var visitors = [];
    if (soirees.length>0) {
      visitors = soirees[0].visitors;
      if (soirees[0].date<req.params.adjustedDateStamp) {
        Soiree.findByIdAndRemove(soirees[0]._id, function (err, doc) {
          if (err) throw err;
          res.send({ currentUser: res.locals.user, visitors: [] });
        });
      } else {
        res.send( { currentUser: res.locals.user, visitors: visitors } );
      }
    } else
      res.send( { currentUser: res.locals.user, visitors: visitors } );
  });
});

router.put('/soirees/:adjustedDateStamp/:venueName', User.ensureAuthenticated, function(req, res) {
  Soiree.find({ yelpId: req.params.venueName }, function(err, soirees) {
    if (err) throw err;

    var newVisitors = []
    if (soirees.length)
      newVisitors = soirees[0].visitors;
    else
      newVisitors = [];

    var userIndex = newVisitors.findIndex((vis) =>
            { return vis.facebookId == res.locals.user.facebookId });
    if (userIndex>=0)
      newVisitors.splice(userIndex, 1);
    else
      newVisitors.push({ name: res.locals.user.name, facebookId: res.locals.user.facebookId});

    Soiree.update({ yelpId: req.params.venueName }, {$set: {visitors: newVisitors, date: req.params.adjustedDateStamp}},
              { upsert: true, new: true, setDefaultsOnInsert: true }, function(){
      res.status(201);
      res.end();
    });
  });
}); // PUT /soirees/:venueName

//***************************************

router.get('/location', User.ensureAuthenticated, function(req, res) {
  var ipinfoUrl = "https://ipinfo.io?token=" + IPINFO_TOKEN;

  request.get(ipinfoUrl,function(err, response, data){
    if (err) throw err;
    data = JSON.parse(data);
    if (response.statusCode == 200)
      res.json({ location: data.city + ', ' + data.region + ' ' + data.country });
      // res.json(data);
    else
      res.json({ location: 'Location API failed. Daily limit exceeded.'});
  });
});





























router.put('/soireestest', function(req, res) {
  var soireeObj1 = new Soiree({
    yelpId: 'lounge-3411-oakland',
    visitors: [
      { name: "Kevin Smith", facebookId: "10155508275352319" } ],
    date: '20170824'
  });

  soireeObj1.save(function(err, soiree) {
    if (err) throw err;
  });


  var soireeObj2 = new Soiree({
    yelpId: 'the-ruby-room-oakland',
    visitors: [
      { name: "Dan Anderson", facebookId: "10155508275352328" },
      { name: "Jake McLean", facebookId: "10155708275352327" }
    ],
    date: '20170825'
  });

  soireeObj2.save(function(err, soiree) {
    if (err) throw err;
  });

  var soireeObj3 = new Soiree({
    yelpId: 'the-libertine-oakland',
    visitors: [
      { name: "Kevin Smith", facebookId: "10155508275352319" },
      { name: "Dan Anderson", facebookId: "10155508275352328" },
      { name: "Jake McLean", facebookId: "10155708275352327" }
     ],
    date: '20170825'
  });

  soireeObj3.save(function(err, soiree) {
    if (err) throw err;
  });


});








module.exports = router;
