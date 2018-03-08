var express = require('express');
var router = express.Router();

var auth = require('./common/auth');

var Poll = require('../models/poll');

router.get('/', function(req, res) {
  Poll.getPoll(req.query.creator, req.query.poll, function(err, poll) {
    if (err) {
      console.log("Error finding poll... creator=" + req.params.username + ", poll=" + req.params.pollname);
      console.log(err);
    } else {
      res.json(poll);
    }
  });
});


// voting

router.put('/', auth.ensureAuthenticated, function(req, res) {
  var data = { creator: req.query.creator, poll: req.query.poll, vote: req.query.vote, username: req.query.username };
  Poll.vote(data, function(err, poll) {
    if (err) {
      console.log("Error finding poll... creator=" + req.params.username + ", poll=" + req.params.pollname +
                    ", vote=" + req.params.vote + ", user=" + req.params.user);
      console.log("Error putting - /polls/" + req.params.username + "/" + req.params.pollname);
      console.log(err);
      req.flash("error_msg", "Vote failed");
    } else {
      req.flash("success_msg", "Vote successfully made");
    }

    res.render('index', {message: req.flash('message') });
  });
});

module.exports = router;
