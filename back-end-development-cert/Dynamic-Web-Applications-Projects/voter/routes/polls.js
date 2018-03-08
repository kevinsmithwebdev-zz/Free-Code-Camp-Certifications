var express = require('express');
var router = express.Router();

var auth = require('./common/auth');

var Poll = require('../models/poll');

// polls/test

router.get('/test', function(req, res) {
  console.log('in polls.test');

  var newPoll = new Poll({
    title: "test title 1 " + ((new Date()).getTime()%1000000),
    choices: [
        { name: 'choice 1', votes: 5 },
        { name: 'choice 1', votes: 9 },
        { name: 'choice 1', votes: 7 }
      ],
    creator: 'qwer',
    voted: []
  });

  Poll.createPoll(newPoll, function(err, poll) {
    if (err)
      throw err;
    console.log("test poll created...");
    console.log(poll);
  });

  var newPoll = new Poll({
    title: "test title 2 " + ((new Date()).getTime()%1000000),
    choices: [
        { name: 'choice 1', votes: 5 },
        { name: 'choice 1', votes: 9 },
        { name: 'choice 1', votes: 7 }
      ],
    creator: 'qwer',
    voted: []
  });

  Poll.createPoll(newPoll, function(err, poll) {
    if (err)
      throw err;
    console.log("test poll created...");
    console.log(poll);
  });

  var newPoll = new Poll({
    title: "test title 3 " + ((new Date()).getTime()%1000000),
    choices: [
        { name: 'choice 1', votes: 5 },
        { name: 'choice 1', votes: 9 },
        { name: 'choice 1', votes: 7 }
      ],
    creator: 'qwer',
    voted: []
  });

  Poll.createPoll(newPoll, function(err, poll) {
    if (err)
      throw err;
    console.log("test poll created...");
    console.log(poll);
  });



});

// polls/new

router.get('/new', auth.ensureAuthenticated, function(req, res) {
  res.render('poll-new');
});

router.post('/new', auth.ensureAuthenticated, function(req, res) {

  req.body.title = req.body.title.trim();
  req.body.choices = req.body.choices
                .map(function(choice) {return choice.trim() })
                .filter (function (choice, i, arr) { return choice && arr.indexOf (choice) == i; });

  req.checkBody({
   'title': {
      notEmpty: true,
      errorMessage: 'Invalid title'
    },
    'choices': {
      enoughChoices: true,
      errorMessage: 'At least two unique choices are required'
    }
  });

  var errors = req.getValidationResult();

  var newPoll = new Poll({
    title: req.body.title,
    choices: req.body.choices.map(function(name) {
        return {name: name, votes: 0}
      }, {}),
    creator: res.locals.user.username,
    voted: []
  });

  Poll.createPoll(newPoll, function(err, poll) {
    if (err)
      throw err;
    else {
      req.flash("success_msg", "Poll succesfully made")
      res.redirect('../');
    }
  });

}); // post polls/new

// show all polls

router.get('/all', function(req, res) {
  Poll.find(function (err, results) {
    if (err) {
      console.log("error in Poll.find");
      throw err;
    }
    var context = { results: results };
    res.render('polls-show-all', context);
  });
});


// /:username/:pollname

router.get('/', function(req, res) {
  var creator = req.query.creator;
  var pollName = req.query.poll;

  Poll.getPoll(creator, pollName, function(err, poll) {
    if (err) {
      console.log("Error finding poll - /polls/" + creator + "/" + pollName);
      console.log(err);
    } else {
      var isLoggedIn = Boolean(res.locals.user);
      var hasVoted;

      if (isLoggedIn)
        hasVoted = (poll.voted.indexOf(res.locals.user.username) != -1);

      var context = {
        poll: poll,
        isLoggedIn: isLoggedIn,
        hasVoted: hasVoted,
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        helpers: {
          wowsers: function () {
             return buildPollChart(poll);
           }
        }
      };
      res.render('poll-show', context);
    }
  });
});

router.delete('/:id', auth.ensureAuthenticated, function(req, res) {
  Poll.removePollById(req.params.id, function (err, results) {
    if (err) {
      throw err;
    } else {
      req.flash("success_msg", 'Poll removed.');
      return res.render('index', {message: req.flash('message')});
    }
  });
});

module.exports = router;
