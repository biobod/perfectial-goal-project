const Event = require('../models/eventModel')

exports.getAllEvents = async () => await Event.find({});
exports.getEvent = async (id) => await Event.findById(id);

exports.eventCreate =  async (data) => {
  try {
    return await Event.create(data)
  } catch (error) {
    return error
  }
}