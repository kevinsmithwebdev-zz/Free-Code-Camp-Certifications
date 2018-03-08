var dotenv = require('dotenv').config();
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var exphbsHelpers = require('./lib/helpers');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var User = require('./models/user');

// database

mongoose.connect(process.env.MONGODB
//   , {
//   useMongoClient: true
// }
);

var db = mongoose.connection;

// Create a new Express application.
var app = express();

// express session

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// global vars

app.use(function(req, res, next) {
  res.locals.appInfo = {
      title: process.env.TITLE,
      titleLong: process.env.TITLE_LONG,
      footer: process.env.FOOTER
    };
  res.locals.user = app.locals.user;
  next();
});

// create routes
var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var api = require('./routes/api');

// require('./config/passport')(passport);

// setup passport

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, callback) {
    User.findOrCreate({ facebookId: profile.id, name: profile.displayName }, function (err, user) {
      if (!user.location) {
        User.findOne({ facebookId: profile.id }, function (err, doc){
          doc.location = 'Barcelona, Spain';
          user.location = doc.location;
          doc.save(function (err) {
            if (err) throw err;
            return callback(err, user);
          });
        });

        // User.update({ facebookId: profile.id }, { $set: { location: 'Barcelona, Spain' }} , { multi: true }, function (err, user) {
        //   if (err) throw err;
        //   return callback(err, user)
        // });
      } else
        return callback(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

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

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/api', api);

// public dir
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, function() { console.log('\n\nServer for "' + process.env.TITLE + '" now listening on port ' + process.env.PORT + ' ...\n\n');} );
