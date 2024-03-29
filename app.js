var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// additional dependencies
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var githubStrategy = require('passport-github').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

// config file
var db = require('./config/globalVars');
var user = require('./models/user');

// routing
var routes = require('./routes/index');
var users = require('./routes/users');
var restaurants = require('./routes/restaurants');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// database connection
mongoose.connect(db.db);

// user authentication
app.use(session({
  secret: db.secret,
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(user.createStrategy());

// GitHub authentication
passport.use(new githubStrategy({
  clientID: db.githubID,
  clientSecret: db.githubSecret,
  callbackURL: db.githubCallback
  }, function(accessToken, refreshToken, profile, cb) {
    user.findOne({ oauthID: profile.id }, function(err, user) {
        if (err) {
          console.log(err);
        }
        else if (user != null) {
          cb(null, user);
        } else {
          user = new user({
            username: profile.username,
            oauthID: profile.id
          });
          user.save(function(err, user) {
            if (err) {
              console.log(err);
            }
            else {
              cb(null, user);
            }
          });
        }
    })
}));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// set routes
app.use('/', routes);
app.use('/users', users);
app.use('/restaurants', restaurants);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
