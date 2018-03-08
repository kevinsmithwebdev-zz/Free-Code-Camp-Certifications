var mongoose = require("mongoose");

var SoireeSchema = mongoose.Schema({
      yelpId:     { type: String },
      visitors:   [ { name: String, facebookId: String }],
      date:       { type: String }
});

var Soiree = module.exports = mongoose.model('Soiree', SoireeSchema);
