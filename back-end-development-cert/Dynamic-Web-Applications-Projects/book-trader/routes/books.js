var express = require('express');
var passport = require('passport');

var router = express.Router();

var LocalStrategy = require('passport-local').Strategy;

var Book = require('../models/book');
var User = require('../models/user');

var auth = require('./common/auth');

// delete book

router.delete('/:id/:title', auth.ensureAuthenticated, function(req, res) {
  Book.findByIdAndRemove(req.params.id, function (err, status) {
    if(err) throw err;
    req.flash("success_msg", 'Book "' + req.params.title + '" deleted.');
    res.send({ success: 'Book "' + req.params.title + '" deleted.' });
  });
});

router.delete('/two/:id1/:id2', auth.ensureAuthenticated, function(req, res) {
  console.log('books/two/:id1/:id2');
  console.log(req.params)
  Book.findByIdAndRemove(req.params.id1, function (err, status) {
    if(err) throw err;
  });
  Book.findByIdAndRemove(req.params.id2, function (err, status) {
    if(err) throw err;
  })
});

// add book

router.get('/add', auth.ensureAuthenticated, function(req, res) {
  res.render('books/add');
});

router.post('/add', auth.ensureAuthenticated, function(req, res) {
  var authors = [];

  if (typeof req.body['authors[]'] == 'string')
    authors = [ req.body['authors[]'] ];
  else
    authors = Array.prototype.slice.call(req.body['authors[]']);

  var newBook = new Book({
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    authors: authors,
    imgUrl: req.body.imgUrl,
    isbn: req.body.isbn,

    ownerId: res.locals.user._id,

    date: new Date()
  });

  Book.createBook(newBook, function(err, book) {
    if (err) {
      throw err;
    } else {
      req.flash("success_msg", 'Book "' + newBook.title + '\" has been added.');
      res.render('index');
      // res.json({ success: "Book added."})
    }
  });
});

module.exports = router;
