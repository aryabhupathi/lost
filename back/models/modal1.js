const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  love: { type: Number, default: 0 }
});

const eventImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  love: { type: Number, default: 0 }
});

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventImages: [eventImageSchema]
});

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  width: { type: Number, required: true },
  noofdays: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  images: [imageSchema],
  events: [eventSchema]
});

module.exports = mongoose.model('Venue', venueSchema);
