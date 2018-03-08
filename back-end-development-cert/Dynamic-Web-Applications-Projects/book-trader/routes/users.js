var express = require('express');
var passport = require('passport');

var router = express.Router();

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var auth = require('./common/auth');


// register

router.get('/register', function(req, res) {
  res.render('auth/register');
});

router.post('/register', function(req, res) {

  req.body.name = req.body.name.trim();
  req.body.username = req.body.username.trim();
  req.body.city = req.body.city.trim();
  req.body.state = req.body.state.trim();
  req.body.country = req.body.country.trim();
  req.body.email = req.body.email.trim();

  req.checkBody('name', "Name is required and must be 4-30 characters").isLength({ min: 4, max: 30 });
  req.checkBody('username', "Username is required and must 4-30 characters").isLength({ min: 4, max: 30  });
  req.checkBody("username", "Username must be 4-30 characters, only alphanumeric with no whitepsace or special characters").matches(/^[a-zA-Z0-9]{4,30}$/, "i");
  req.checkBody("password", "Password must be 4-30 characters and have no whitepsace").matches(/^[^\s]{4,30}$/, "i");
  req.checkBody('password2', "Passwords do not match").equals(req.body.password);
  req.checkBody('city', "City is required and must 4-30 characters").isLength({ min: 4, max: 30 });
  req.checkBody('state', "State is required and must 2-30 characters").isLength({ min: 2, max: 30  });
  req.checkBody('country', "Country is required and must 2-30 characters").isLength({ min: 2, max: 30  });;
  req.checkBody('email', "Email is required and must be a valid email and must 6-30 characters").isEmail().isLength({ min: 6, max: 30  });;

  User.count({ 'username': req.body.username }, function (err, count) {
    if (err) throw err;

    req.getValidationResult().then(function(result) {

      var errors = result.array();

      if (count>0) {
        errors.push( { param: 'username', msg: 'That username is already in use.', value: 'u'} );
      }
      if (errors.length) {
        res.render('auth/register', {
          errors: errors
        });
      } else {
        var newUser = new User({
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          email: req.body.email
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
  res.render('auth/login', {message: req.flash('message') });
});

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: 'Login failure', successFlash: 'Login successful'}), function(req, res) {
  console.log("error logging in.");
});

router.get('/logout', auth.ensureAuthenticated, function(req, res) {
  req.logout();
  req.flash('success_msg', "Successfully logged out");
  res.redirect('/users/login');
});

// change password

router.get('/change-password', auth.ensureAuthenticated, function(req, res) {
  res.render('auth/change-password', {message: req.flash('message') });
});


router.post('/change-password', auth.ensureAuthenticated, function(req, res) {
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
        req.flash("success_msg", "Password has been changed, please log in again.");
        res.redirect("login");
      });
    }
  });

}); // POST - change-password

// change location

router.get('/change-location', auth.ensureAuthenticated, function(req, res) {
  res.render('auth/change-location', {message: req.flash('message') });
});


router.post('/change-location', auth.ensureAuthenticated, function(req, res) {
  var newCity = req.body['new-city'].trim();
  var newState = req.body['new-state'].trim();
  var newCountry = req.body['new-country'].trim();

  req.checkBody('new-city', "City is required and must 4-30 characters").isLength({ min: 4, max: 30 });
  req.checkBody('new-state', "State is required and must 2-30 characters").isLength({ min: 2, max: 30  });
  req.checkBody('new-country', "Country is required and must 2-30 characters").isLength({ min: 2, max: 30  });;

  req.getValidationResult().then(function(result){
    var errors = result.array();
    if(errors.length) {
      res.render('auth/change-location', {
        errors: errors
      });
    } else {
      var dataObj = {
        id: res.locals.user._id,
        newLocation: { city: newCity, state: newState, country: newCountry }
      };
      User.changeLocation(dataObj, function() {
        req.flash("success_msg", "Location has been changed.")
        res.redirect("/");
      });
    }
  });

}); // POST - change-location


// get user by id

router.get('/:id', auth.ensureAuthenticated, function(req, res) {
  User.findById(req.params.id, function (err, user) {
    res.send(user);
  });
});

// passport

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
