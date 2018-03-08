var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

// Define routes.

router.get('/', User.ensureAuthenticated,
  function(req, res) {
    res.render('home');
  }
);


router.get('/about',
  function(req, res) {
    res.render('about');
  }
);


module.exports = router;
