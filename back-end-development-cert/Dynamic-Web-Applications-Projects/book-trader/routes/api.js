var express = require('express');
var router = express.Router();
var googleBooks = require('google-books-search');

var Book = require('../models/book');
var User = require('../models/user');
var Message = require('../models/message');

var auth = require('./common/auth');

var ObjectID = require('mongodb').ObjectID;

router.get('/book', auth.ensureAuthenticated, function(req, res) {
  var options = {
      key: process.env.GOOGLE_BOOKS_API_KEY,
      offset: 0,
      limit: 20,
      type: 'books',
      order: 'relevance',
      lang: 'en'
  };
  var query = req.query.search || 'barcelona';
  googleBooks.search(query, options, function(err, book, apiResponse) {
    if (err) {
      console.log(err);
      res.send({ error: err });
    } else {
      var booksArr = [];

      if (!apiResponse) // nothing found
        res.send([]);
      else {
        apiResponse.items.forEach(function(book) {
          var bookObj = {};
          bookObj.title = book.volumeInfo.title || '';
          bookObj.subtitle = book.volumeInfo.subtitle || '';
          bookObj.description = book.volumeInfo.description || '';
          bookObj.authors = book.volumeInfo.authors || [];
          if (book.volumeInfo.imageLinks)
            bookObj.imgUrl = /* book.volumeInfo.imageLinks.smallThumbnail || */ book.volumeInfo.imageLinks.thumbnail || '';
          if (book.volumeInfo.industryIdentifiers)
            bookObj.isbn = book.volumeInfo.industryIdentifiers[0].identifier || '';
          else
            bookObj.isbn = '';
          booksArr.push(bookObj);
        });
        res.send(booksArr);
      }
    }
  }); // googleBooks.search
}); // GET api/book


router.get('/all', auth.ensureAuthenticated, function(req, res) {

  var count=0;
  var data = {};

  Book.find({ownerId: {'$ne':res.locals.user._id }}, function(err, otherBooks) {
    if (err)
      throw err;
    data.other = otherBooks;
    if (++count==2)
      returnData();
  });

  Book.find({ownerId: res.locals.user._id}, function(err, userBooks) {
    if (err)
      throw err;
    data.user = userBooks;
    if (++count==2)
      returnData();
  });

  function returnData() {
    res.send(data);
  }

}); // GET api/all

//***************************************

router.get('/messages', auth.ensureAuthenticated, function(req, res) {
  var returnArr = [];
  Message.find({ toUserId: res.locals.user._id }, function(err, messageArr) {
    if (err) throw err;
    messageArr.forEach(function(msg) {
      returnArr.push({ data: msg });
    });

    var needed = messageArr.length*3;

    messageArr.forEach(function(msg, i) {
      var j=i;

      Book.findById(msg.toBookId, function(err, book) {
        if (err) throw err;
        returnArr[j].toBookObj = book;
        if (!(--needed))
          res.send(returnArr);
      });
      Book.findById(msg.fromBookId, function(err, book) {
        if (err) throw err;
        returnArr[j].fromBookObj = book;
        if (!(--needed))
          res.send(returnArr);
      });
      User.findById(msg.fromUserId, function(err, user) {
        if (err) throw err;
        returnArr[j].fromUserObj = user;
        if (!(--needed))
          res.send(returnArr);
      });

    })
  });
}); // GET api/messages

router.post('/messages', auth.ensureAuthenticated, function(req, res) {
  Message.createMessage(req.body, function(err, message) {
    if (err) throw err;
    var flashMsg = '';
    switch (req.body.messageType) {
      case 'offer':
        flashMsg = "Offer made."
        break;
      case 'accept':
        flashMsg = "Acceptance message sent."
        break;
      case 'reject':
        flashMsg = "Rejection message sent."
        break;
    }
    req.flash("success_msg", flashMsg);
    res.send({ success: 'Message posted.'});
  });
}); // GET messages/to


router.get('/messages/newCount', auth.ensureAuthenticated, function(req, res) {
  Message.count({ toUserId: res.locals.user._id, isUnread: true }, function(err, count) {
    if (err) throw err;
    res.send({ count: count });
  });
}); // GET api/messages/count

//***************************************

module.exports = router;
