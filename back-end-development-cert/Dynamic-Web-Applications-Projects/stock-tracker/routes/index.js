var express = require('express');
var router = express.Router();

// Define routes.

router.get('/', function(req, res) {
    res.render('home');
  }
);

//
// router.get('/about',
//   function(req, res) {
//     res.render('about');
//   }
// );


module.exports = router;
