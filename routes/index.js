var express = require('express');
var passport = require('passport');
var user = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' , user: req.user});
});

// GET login page
router.get('/login', function(req, res, next) {
  var messages = req.session.messages || [];
  req.session.messages = [];
  if (req.user){
    res.redirect('/');
  } else {
    res.render('login', { title: 'Login' , user: req.user, messages: messages});
  }
});

// authenticate login on POST
router.post('/login', passport.authenticate('local', {
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureMessage: 'Invalid Credentials'
}));

// GET register page
router.get('/register', function(req, res, next) {
  if (req.user){
    res.redirect('/');
  } else {
    res.render('register', { title: 'Register' , user: req.user});
  }
});

// attempt new user creation
router.post('/register', function(req, res, next) {
  user.register(new user({ username: req.body.username }), req.body.password,
    function(err, user) {
      if (err) {
        res.redirect('/error');
      }
      else {
        res.redirect('/login');
      }
    }
  );
});

// GitHub authentication
router.get('/github', passport.authenticate('github'));

// GitHub callback authentication
router.get('/github/callback', passport.authenticate('github', {
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureMessage: 'Invalid Credentials'
}));

// GET logout request
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
