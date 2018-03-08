var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');


router.get('/changeLocation', User.ensureAuthenticated, function(req, res) {
  res.render('change-location');
});

router.post('/changeLocation', User.ensureAuthenticated, function(req, res) {
  User.update({ facebookId: res.locals.user.facebookId }, { location: req.body.location.trim() }, function() {
    req.app.locals.user.location = req.body.location.trim();
    res.render('home');
  });
});

router.get('/getLocation', User.ensureAuthenticated, function(req, res) {
  User.find({ facebookId: res.locals.user.facebookId }, function(err, users) {
    if (err) throw err;
    res.json({ location: users[0].location });
  });
});

module.exports = router;
