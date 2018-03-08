var mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate');

var UserSchema = mongoose.Schema({
      location:   { type: String },
      name:       { type: String },
      facebookId: { type: String }
});

UserSchema.plugin(findOrCreate);

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.facebookCreateUser = function(newUser, callback) {
  newUser.save(callback);
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/login');
  }
}
