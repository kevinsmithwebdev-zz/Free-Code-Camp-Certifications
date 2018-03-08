var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

//****************************************************

router.get('/login',
  function(req, res){
    res.render('auth/login');
});

router.get('/logout',
  function(req, res){
    req.logout();
    delete req.app.locals.user;
    res.redirect('/auth/login');
});

//****************************************************

router.get('/facebook',
  passport.authenticate('facebook'), function() {
});

router.get('/facebook/return', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    req.app.locals.user = req.user;
    res.redirect('/');
  }
);

module.exports = router;
