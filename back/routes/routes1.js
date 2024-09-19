const express = require('express');
const router = express.Router();
const Venue = require('../models/modal1');

// GET all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find();
    if (venues.length === 0) {
      return res.status(404).json({ message: 'No venues found.' });
    }
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching venues: ' + err.message });
  }
});

// GET a specific venue by ID
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found.' });
    }
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching venue: ' + err.message });
  }
});

// POST new venue
router.post('/', async (req, res) => {
  const {
    name, address, description, height, weight, width,
    days, type, category, images, events, community
  } = req.body;

  // Validate required fields
  if (!name || !address || !description || !height || !days || !weight || !width || !type || !category || !community) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  // Validate arrays
  if (!Array.isArray(images) || !Array.isArray(events)) {
    return res.status(400).json({ message: 'Images and events must be arrays.' });
  }


  const newVenue = new Venue({
    name, address, description, height, weight, width, days, community,
    type, category, images, events
  });

  try {
    const savedVenue = await newVenue.save();
    res.status(201).json(savedVenue);
  } catch (err) {
    console.error('Error saving venue:', err);  // Log detailed error in the server logs
    res.status(500).json({ message: 'Error saving venue: ' + err.message });
  }
});


module.exports = router;
