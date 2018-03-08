var express = require('express');
var passport = require('passport');

var router = express.Router();

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var auth = require('./common/auth');

// register

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {

  var name = req.body.name.trim();
  var username = req.body.username.trim();
  var password = req.body.password.trim();
  var password2 = req.body.password2.trim();

  // validation

  req.checkBody('name', "Name is required").notEmpty();
  req.checkBody('username', "Username is required").notEmpty();
  req.checkBody("username", "Username must be at least 4 characters, only alphanumeric with no whitepsace or special characters").matches(/^[a-zA-Z0-9]{4,}$/, "i");
  req.checkBody('password', "Password is required").notEmpty();
  req.checkBody("password", "Password must be at least 4 characters long and have no whitepsace").matches(/^[^\s]{4,}$/, "i");
  req.checkBody('password2', "Passwords do not match").equals(req.body.password);

  User.count({ 'username': username }, function (err, count) {
    if (err) throw err;

    req.getValidationResult().then(function(result) {

      var errors = result.array();

      if (count>0) {
        errors.push( { param: 'username', msg: 'That username is already in use.', value: 'u'} );
      }
      if (errors.length) {
        res.render('register', {
          errors: errors
        });
      } else {
        var newUser = new User({
          name: name,
          username: username,
          password: password
        });
        User.createUser(newUser, function(err, user) { // wowsers
          if (err) throw err;
          req.flash("success_msg", "You are registered and can now log in.");
          res.redirect("/users/login");
        });
      }
    });
  });
});

// login and logout

router.get('/login', function(req, res) {
  res.render('login', {message: req.flash('message') });
});

router.post('/login',
  passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: 'Login failure', successFlash: 'Login successful'}),
    function(req, res) { console.log("error logging in.")});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success_msg', "Successfully logged out");
  res.redirect('/users/login');
});

// change password

router.get('/change-password', auth.ensureAuthenticated, function(req, res) {
  res.render('change-password', {message: req.flash('message') });
});


router.post('/change-password', function(req, res) {
  var newPassword = req.body['new-password'].trim();
  var newPassword2 = req.body['new-password2'].trim();

  req.checkBody('new-password', "New passwords are required").notEmpty();
  req.checkBody("new-password", "Password must be at least 4 characters long and have no whitepsace").matches(/^[^\s]{4,}$/, "i");
  req.checkBody('new-password2', "New passwords do not match").equals(req.body['new-password']);

  req.getValidationResult().then(function(result){
    var errors = result.array();
    if(errors.length) {
      res.render('change-password', {
        errors: errors
      });
    } else {
      User.changePassword({ username: req.user.username, newPassword: newPassword}, function() {
        req.logout();
        req.flash("success_msg", "Password has been changed, please log in again.")
        res.redirect("login");
      });
    }
  });

}); // POST - change-password


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {message: "Unknown User"});
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid Password'});
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});



module.exports = router;
