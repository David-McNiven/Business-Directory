var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' , user: req.user});
});

router.get('/login', function(req, res, next) {
  if (req.user){
    res.redirect('/');
  } else {
    res.render('login', { title: 'Login' , user: req.user});
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/restaurants',
  failureRedirect: '/login',
  failureMessage: 'Invalid Credentials'
}));

router.get('/register', function(req, res, next) {
  if (req.user){
    res.redirect('/');
  } else {
    res.render('register', { title: 'Register' , user: req.user});
  }
});

router.post('/register', function(req, res, next) {
  User.register(new User({ username: req.body.username }), req.body.password,
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

router.get('/logout', funtion(req, res, next){
  req.logout();
  res.redirect('/');
});

module.exports = router;
