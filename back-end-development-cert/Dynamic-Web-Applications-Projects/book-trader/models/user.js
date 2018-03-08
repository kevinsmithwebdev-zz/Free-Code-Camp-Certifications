var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: true
  },
  password: { type: String },
  name:     { type: String },
  city:     { type: String },
  state:    { type: String },
  country:  { type: String },
  email:    { type: String }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
    });
  });
}

module.exports.changePassword = function(data, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(data.newPassword, salt, function(err, hash) {
      var query = { username: data.username };
      User.findOneAndUpdate(query, { password: hash }, {new: true}, callback);
    });
  });
}

module.exports.changeLocation = function(data, callback) {
  console.log('in changeLocation')
  console.log(data)
  var query = { _id: data.id };
  User.findOneAndUpdate(query, data.newLocation, {new: true}, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  if (!hash)
    hash = "";
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
}
