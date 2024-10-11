const mongoose = require("mongoose");

// Schema for storing image data related to a venue
const imageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  love: { type: Number, default: 0 },
});

// Schema for storing image data related to an event
const eventImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  love: { type: Number, default: 0 },
});

// Schema for storing details about a venue
const venueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    community: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    days: { type: Number, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    images: [imageSchema], // Store multiple images as an array of image objects
    eventIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], // Reference to Event documents
  },
  { collection: "try1" }
);

// Schema for storing details about an event held at the venue
const eventSchema = new mongoose.Schema(
  {
    venueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: true,
    }, // Reference to Venue document
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    images: [eventImageSchema], // Store multiple event images as an array of image objects

    category: { type: String, required: true },
  },
  { collection: "try2" }
);

// Export the Mongoose models for the Venue and Event schemas
const Venue = mongoose.model("Venue", venueSchema);
const Event = mongoose.model("Event", eventSchema);

module.exports = { Venue, Event };
