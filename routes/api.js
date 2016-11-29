var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');

// return a list of all restaurants
router.get('/', function(req, res, next) {
  Restaurant.find(function(err, restaurants){
    if (err) {
      res.send(err);
    } else {
      res.json(restaurants);
    }
  });
});

// returns specific restaurant
router.get('/:id', function(req, res, next) {
  Restaurant.findById(req.params.id,function(err, restaurant){
    if (err) {
      res.send(err);
    } else {
      res.json(restaurant);
    }
  });
});
