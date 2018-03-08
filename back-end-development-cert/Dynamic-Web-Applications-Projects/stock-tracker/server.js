var dotenv = require('dotenv').config();
var path = require('path');
var express = require('express');
var session = require('express-session');
var exphbs = require('express-handlebars');
var exphbsHelpers = require('./lib/helpers');

var socket = require('socket.io');

// Create a new Express application.
var app = express();

var server = app.listen(process.env.PORT, function() {
  console.log('\n\nServer for stockTracker now listening on port ' + process.env.PORT + ' ...\n\n');
});


// express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true
}));

global.stockObjs = [];

// global vars
app.use(function(req, res, next) {
  // res.locals.appInfo = {
  //     title: process.env.TITLE,
  //     titleLong: process.env.TITLE_LONG,
  //     footer: process.env.FOOTER
  //   };
  // console.log('in app.use...')
  // console.log(app.locals);
  // if (!app.locals.stocksList)
  //   res.locals.stocksList = [];
  // else
  //   res.locals.stocksList = app.locals.stocksList;
  // res.locals.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx = '**************************************************';
  next();
});

// create routes
var index = require('./routes/index');
var api = require('./routes/api');

// Define routes.
app.use('/', index);
app.use('/api', api);

// public dir
app.use(express.static(path.join(__dirname, 'public')));


// Configure view engine to render hbs templates.
app.set('views', path.join(__dirname, 'views'));
var exphbsHelpers = require('./lib/helpers');
app.engine('.hbs', exphbs(
  {
    extbane: '.hbs',
    defaultLayout:'defaultlayout.hbs',
    helpers: exphbsHelpers
  })
);
app.set('view engine', '.hbs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
// app.use(require('morgan')('tiny'));

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));


// socket setup

var io = socket(server);
require('./sockets/sockets')(io);
