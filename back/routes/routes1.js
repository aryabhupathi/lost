const express = require("express");
const router = express.Router();
const { Venue, Event } = require("../models/modal1"); // Destructure the imported models

// GET all venues
router.get("/", async (req, res) => {
  try {
    const venues = await Venue.find();
    if (venues.length === 0) {
      return res.status(404).json({ message: "No venues found." });
    }
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: "Error fetching venues: " + err.message });
  }
});

// GET all events
router.get("/event", async (req, res) => {
  try {
    const events = await Event.find();
    console.log("Fetched Events:", events); // Log the fetched events
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found." });
    }
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events: " + err.message });
  }
});

// GET a specific venue by ID
router.get("/:id", async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found." });
    }
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: "Error fetching venue: " + err.message });
  }
});

// GET a specific event by ID (distinct route for event)
router.get("/event/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error fetching event: " + err.message });
  }
});

// Create a venue
router.post("/", async (req, res) => {
  try {
    const newVenue = new Venue(req.body);
    const savedVenue = await newVenue.save();
    res.status(201).json(savedVenue);
  } catch (error) {
    console.error("Error creating venue:", error);
    res.status(500).json({ message: "Error creating venue" });
  }
});

// POST route for creating an event and updating the corresponding venue
router.post("/event", async (req, res) => {
  try {
    const eventData = req.body; // Expecting { name, description, date, images, category, venueId }

    // Create the new event
    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();

    // Update the corresponding Venue with the new event ID
    await Venue.findByIdAndUpdate(eventData.venueId, {
      $push: { eventIds: savedEvent._id }, // Push the new event ID to the eventIds array
    });

    res.status(201).json(savedEvent); // Return the created event
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).json({ message: "Server error, unable to save event" });
  }
});

// PATCH route for updating a venue
router.patch("/:id", async (req, res) => {
  try {
    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Run validation on update
      }
    );

    if (!updatedVenue) {
      return res.status(404).json({ message: "Venue not found." });
    }

    res.json(updatedVenue);
  } catch (error) {
    console.error("Error updating venue:", error);
    res.status(500).json({ message: "Error updating venue" });
  }
});

// PATCH route for updating an event
router.patch("/event/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Run validation on update
      }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Error updating event" });
  }
});

module.exports = router;
