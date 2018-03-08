var express = require('express');
var router = express.Router();
var passport = require('passport');
var ensure = require('connect-ensure-login')

router.get('/', function(req, res) {
  var userObj = { user: req.user }
  if (req.user) {
    userObj.encodedUser = encodeURIComponent(JSON.stringify(req.user))
    userObj.isLoggedIn = true
  } else {
    userObj.isLoggedIn = false
  }
  res.render('index', userObj )
})

router.get('/login', function(req, res) {
  res.render('auth/login')
})

router.get('/logout', ensure.ensureLoggedIn(), function(req, res) {
  req.logout()
  res.redirect('/login')
})

router.get('/login/twitter', passport.authenticate('twitter'));

router.get('/login/twitter/return', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
})


module.exports = router;
