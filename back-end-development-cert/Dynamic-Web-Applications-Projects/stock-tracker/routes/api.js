var express = require('express');
var router = express.Router();


router.get('/list', function(req, res) {
  res.json(global.stockObjs);
});

module.exports = router;
