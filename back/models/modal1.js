const mongoose = require('mongoose');

// Schema for storing image data related to a venue
const imageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  love: { type: Number, default: 0 }
});

// Schema for storing image data related to an event
const eventImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  love: { type: Number, default: 0 }
});

// Schema for storing details about an event held at the venue
const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventImages: [eventImageSchema]
});

// Main schema for storing venue details
const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  community: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  width: { type: Number, required: true },
  days: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  images: [imageSchema],
  events: [eventSchema]
},{ collection: 'try1' });

// Export the Mongoose model for the venue schema
module.exports = mongoose.model('Venue', venueSchema);
