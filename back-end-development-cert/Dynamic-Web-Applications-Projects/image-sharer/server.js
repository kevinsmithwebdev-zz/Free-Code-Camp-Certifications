var dotenv = require('dotenv').config();
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

var mongo = require('mongodb');
var mongoose = require('mongoose');

// database

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB, {
  useMongoClient: true
});

var db = mongoose.connection;

// initialize passport

passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: process.env.PP_CALLBACK_URL
  },
  function(token, tokenSecret, profile, callback) {
    return callback(null, profile);
  }));
passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

// Create a new Express application.
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Configure view engine to render EJS templates.
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs(
        {
          extbane: '.hbs',
          defaultLayout:'main.hbs',
          // helpers: exphbsHelpers
        }
    ));

app.set('view engine', '.hbs');

// Initialize session

var cookieParser = require('cookie-parser')
var session = require('express-session')

app.use(cookieParser()) // required before session.
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.

var routes = require('./routes/index');
var images = require('./routes/images');
var api = require('./routes/api');

app.use('/', routes);
app.use('/images', images);
app.use('/api', api);

app.listen(process.env.PORT, function() { console.log('\n\nServer listening on port ' + process.env.PORT); });
