var mongoose = require('mongoose');

module.exports = mongoose.model('restaurants', new mongoose.Schema({
  name:{
    type: String
  },
  phone:{
    type: String
  },
  address:{
    type: String
  },
  cuisine:{
    type: String
  },
  rating:{
    type: Number
  }
})
);
