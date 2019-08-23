const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;

const EventSchema = new Schema({
  name: { type: String, required: true, max: 100, unique: false },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  creatorId:  { type: ObjectId, required: true },
  contribution: { type: Number, required: false },
  agreedUsers: [ObjectId],
  rejectedUsers: [ObjectId],
  maybeUsers: [ObjectId],
  image: {
    path: { type: String, required: true },
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    encoding:  { type: String, required: true },
  },
})

module.exports = mongoose.model('Event', EventSchema);
