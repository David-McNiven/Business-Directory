var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.get('/', function(req, res, next) {
  Restaurant.find(function(err, restaurants){
    if (err) {
      res.redirect('/error');
    } else {
      res.render('restaurants', { title: 'Restaurants', restaurants: restaurants, user: req.user });
    }
  });
});

router.get('/new', isAuth, function(req, res, next) {
  res.render('edit', { title: 'Add New', user: req.user, restaurant: null });
});

router.post('/new', isAuth, function(req, res, next) {
  Restaurant.create({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    cuisine: req.body.cuisine,
    rating: parseInt(req.body.rating)
  }, function(err, Restaurant){
    if (err) {
      res.redirect('/error');
    } else {
      res.redirect('/restaurants');
    }
  });
});

router.get('/:id', isAuth, function(req, res, next) {
  Restaurant.findById(req.params.id, function(err, restaurant){
    if (err) {
      res.redirect('/error');
    } else {
      res.render('edit', { title: 'Edit ' + restaurant.name, restaurant: restaurant, user: req.user });
    }
  });
});

router.post('/:id', isAuth, function(req, res, next) {
  var restaurant = new Restaurant({
    _id: req.params.id,
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    cuisine: req.body.cuisine,
    rating: parseInt(req.body.rating)
  });
  Restaurant.update({ _id: req.params.id }, restaurant, function(err) {
    if (err){
      res.redirect('/error');
    } else {
      res.redirect('/restaurants');
    }
  })
});

router.get('/delete/:id', isAuth, function(req, res, next) {
  Restaurant.remove({ _id: req.params.id }, function(err) {
    if (err) {
      res.redirect('/error');
    } else {
      res.redirect('/restaurants');
    }
  });
});

function isAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
