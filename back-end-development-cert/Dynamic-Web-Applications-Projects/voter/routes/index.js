var express = require('express');
var router = express.Router();

var auth = require('./common/auth');

var Poll = require('../models/poll');

// get homepage

router.get('/', auth.ensureAuthenticated, function(req, res) {
  Poll.getUserPolls(res.locals.user.username, function(err, polls) {
    if (err) {
      console.log("Error get polls for user " + res.locals.user.username);
      console.log(err);
      throw err;
      req.flash("error_msg", 'Error getting polls for user "' + res.locals.user.username + '"');
      res.render('index', {message: req.flash('message') });
    } else {
      res.render('index', {message: req.flash('message'), polls: polls});
    }
  });
});

module.exports = router;
