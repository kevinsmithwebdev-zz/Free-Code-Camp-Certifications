var mongoose = require("mongoose");

var MessageSchema = mongoose.Schema({
  toUserId:     { type: String },
  toBookId:     { type: String },
  fromUserId:   { type: String },
  fromBookId:   { type: String },
  isUnread:     { type: Boolean },
  date:         { type: Date },
  messageType:  { type: String }
});

var Message = module.exports = mongoose.model('Message', MessageSchema);

module.exports.createMessage = function(newMessage, callback) {
  newMessage = new Message(newMessage);
  newMessage.save(callback);
}
