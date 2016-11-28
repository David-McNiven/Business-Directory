var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String
  },
  oauthID: {
    type: String
  }
});

UserSchema.plugin(plm);
module.exports = mongoose.model('user', UserSchema,'users');
