var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.get('/', function(req, res, next) {
  Movie.find(function(err, restaurants){
    if (err) {
      res.redirect('error');
    } else {
      res.render('restaurants', { title: 'Restaurants', restaurant: restaurants });
    }
  });
});

module.exports = router;
