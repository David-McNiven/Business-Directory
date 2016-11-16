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

userSchema.plugin(plm);
module.exports = mongoose.model('User', UserSchema,'users');
