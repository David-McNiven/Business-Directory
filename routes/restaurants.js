var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

router.get('/', function(req, res, next) {
  Restaurant.find(function(err, restaurants){
    if (err) {
      res.redirect('error');
    } else {
      res.render('restaurants', { title: 'Restaurants', restaurants: restaurants });
    }
  });
});

module.exports = router;
