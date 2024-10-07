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
router.get("/event/:eventIds", async (req, res) => {
  const eventIds = req.params.eventIds.split(",").map((id) => id.trim());

  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events" });
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
    const eventData = req.body;

    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();

    await Venue.findByIdAndUpdate(eventData.venueId, {
      $push: { eventIds: savedEvent._id },
    });

    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).json({ message: "Server error, unable to save event" });
  }
});

router.put("/:id/images", async (req, res) => {
  const { imageUrl, like, dislike, love } = req.body;

  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    const image = venue.images.find((img) => img.imageUrl === imageUrl);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Only increment the count for the button that was clicked
   
    if (like !== undefined) image.like += like;
    if (dislike !== undefined) image.dislike += dislike;
    if (love !== undefined) image.love += love;
    const updatedVenue = await venue.save();

    res.status(200).json({ message: "Image updated successfully", image });
  } catch (error) {
    console.error("Error updating image counts:", error);
    res.status(500).json({ message: "Error updating image counts" });
  }
});

router.put("/event/:venueId/images/:imageId", async (req, res) => {
  const { venueId, imageId } = req.params;
  const { like, dislike, love } = req.body;

  try {
    // Find the event by venueId
    const event = await Event.findOne({ venueId: venueId });

    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found for the provided venueId" });
    }

    // Locate the specific image in the images array
    const image = event.images.find(img => img._id.toString() === imageId);
console.log(image, 'klklklklklklklklklklklklkl');
    if (!image) {
      return res
        .status(404)
        .json({ message: "Image not found in the event's images" });
    }

    // Update image counts
    if (like !== undefined) image.like += like;
    if (dislike !== undefined) image.dislike += dislike;
    if (love !== undefined) image.love += love;

    await event.save();

    res
      .status(200)
      .json({ message: "Image counts updated successfully", image });
  } catch (error) {
    console.error("Error updating image counts:", error);
    res.status(500).json({ message: "Error updating image counts", error });
  }
});

module.exports = router;
