const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

const EventSchema = new Schema({
  name: { type: String, required: true, max: 100, unique: false },
  description: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  creatorId:  { type: ObjectId, required: true },
  contribution: { type: Number, required: false },
  agreedUsers: [ObjectId],
  rejectedUsers: [ObjectId],
  maybeUsers: [ObjectId],
  image: {
    data: Buffer,
    contentType: String,
  },
})

module.exports = mongoose.model('Event', EventSchema);
