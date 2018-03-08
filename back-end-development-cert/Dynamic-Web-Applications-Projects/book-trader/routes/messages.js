var express = require('express');
var router = express.Router();

var auth = require('./common/auth');

var Message = require('../models/message');

router.get('/', auth.ensureAuthenticated, function(req, res) {
  res.render('messages', {message: req.flash('message'), encodedUser : encodeURIComponent(JSON.stringify(res.locals.user)) });
});

router.post('/read/:id', auth.ensureAuthenticated, function(req, res) {
  Message.update({ _id: req.params.id }, { isUnread: false }, function(err, status) {
    if (err) throw err;
  });
});

router.delete('/:id', auth.ensureAuthenticated, function(req, res) {
  Message.findByIdAndRemove(req.params.id, function (err, status){
    if (err) throw err;
  });
});

module.exports = router;
