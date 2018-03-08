var express = require('express');
var router = express.Router();

var auth = require('./common/auth');


// get homepage

router.get('/', auth.ensureAuthenticated, function(req, res) {
  res.render('index', {message: req.flash('message'), encodedUser : encodeURIComponent(JSON.stringify(res.locals.user)) });
});

router.get('/dashboard', auth.ensureAuthenticated, function(req, res) {
  res.render('dashboard', {message: req.flash('message') });
});

module.exports = router;
