var mongoose = require("mongoose");

var BookSchema = mongoose.Schema({
  title:          { type: String },
  subtitle:       { type: String },
  description:    { type: String },
  authors:        [ String ],
  imgUrl:         { type: String },
  isbn:           { type: String },

  ownerId:        { type: String },

  date:           { type: Date }
});

var Book = module.exports = mongoose.model('Book', BookSchema);

module.exports.createBook = function(newBook, callback) {
  newBook.save(callback);
}
