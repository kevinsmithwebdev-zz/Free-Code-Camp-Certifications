var mongoose = require("mongoose");

var ImageSchema = mongoose.Schema({
  title:      { type: String },
  url:        { type: String },
  ownerName:  { type: String },
  ownerId:    { type: String },
  date:       { type: Date },
  likes:      [ String ],
  numLinks:   { type: Number }
});

var Image = module.exports = mongoose.model('Image', ImageSchema);

module.exports.createImage = function(imageObj, callback) {
  var newImage = new Image(imageObj);
  newImage.save(callback);
}
