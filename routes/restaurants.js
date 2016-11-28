var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

// GET restaurants page populated from database
router.get('/', function(req, res, next) {
  Restaurant.find(function(err, restaurants){
    if (err) {
      res.redirect('/error');
    } else {
      res.render('restaurants', { title: 'Restaurants', restaurants: restaurants, user: req.user });
    }
  });
});

// GET new restaraunt creation page
router.get('/new', isAuth, function(req, res, next) {
  res.render('edit', { title: 'Add New', user: req.user, restaurant: null });
});

// attempt to add new restaurant to database on POST request
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

// GET edit existing restaurant page by id
router.get('/:id', isAuth, function(req, res, next) {
  Restaurant.findById(req.params.id, function(err, restaurant){
    if (err) {
      res.redirect('/error');
    } else {
      res.render('edit', { title: 'Edit ' + restaurant.name, restaurant: restaurant, user: req.user });
    }
  });
});

// attempt to update existing restaurant in database on POST request
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

// attempt to delete selected restaurant from database on POST request
router.get('/delete/:id', isAuth, function(req, res, next) {
  if (confirm('Are you sure you?')) {
    Restaurant.remove({ _id: req.params.id }, function(err) {
      if (err) {
        res.redirect('/error');
      } else {
        res.redirect('/restaurants');
      }
    });
  } else {
    res.redirect('/restaurants');
  }
});

// user authentication check for all CRUD operations
function isAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
