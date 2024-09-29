// const express = require('express');
// const router = express.Router();
// const Venue = require('../models/modal1');

// // GET all venues
// router.get('/', async (req, res) => {
//   try {
//     const venues = await Venue.find();
//     if (venues.length === 0) {
//       return res.status(404).json({ message: 'No venues found.' });
//     }
//     res.json(venues);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching venues: ' + err.message });
//   }
// });

// // GET a specific venue by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const venue = await Venue.findById(req.params.id);
//     if (!venue) {
//       return res.status(404).json({ message: 'Venue not found.' });
//     }
//     res.json(venue);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching venue: ' + err.message });
//   }
// });

// // POST new venue
// router.post('/', async (req, res) => {
//   const {
//     name, address, description, height, weight, width,
//     days, type, category, images, events, community
//   } = req.body;

//   // Validate required fields
//   // if (!name || !address || !description || !height || !days || !weight || !width || !type || !category || !community) {
//   //   return res.status(400).json({ message: 'Please fill in all required fields.' });
//   // }

//   // // Validate arrays
//   // if (!Array.isArray(images) || !Array.isArray(events)) {
//   //   return res.status(400).json({ message: 'Images and events must be arrays.' });
//   // }

//   const newVenue = new Venue({
//     name, address, description, height, weight, width, days, community,
//     type, category, images, events
//   });

//   try {
//     const savedVenue = await newVenue.save();
//     res.status(201).json(savedVenue);
//   } catch (err) {
//     console.error('Error saving venue:', err);  // Log detailed error in the server logs
//     res.status(500).json({ message: 'Error saving venue: ' + err.message });
//   }
// });

// router.put('/:venueId/images', async (req, res) => {
//   const { venueId } = req.params;
//   const { imageUrl, like, dislike, love } = req.body;

//   try {
//     // Find the venue by its ID
//     const venue = await Venue.findById(venueId);
//     if (!venue) {
//       return res.status(404).json({ message: 'Venue not found.' });
//     }

//     // Find the image within the venue's images array
//     const image = venue.images.find((img) => img.imageUrl === imageUrl);
//     if (!image) {
//       return res.status(404).json({ message: 'Image not found.' });
//     }

//     // Update the image's like, dislike, and love counts only if they are provided
//     if (typeof like === 'number') {
//       image.like = like;
//     }
//     if (typeof dislike === 'number') {
//       image.dislike = dislike;
//     }
//     if (typeof love === 'number') {
//       image.love = love;
//     }

//     // Save the updated venue document
//     await venue.save();

//     res.status(200).json({ message: 'Image counts updated successfully', venue });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error: ' + err.message });
//   }
// });


// // Update counts for an event image
// router.put('/:venueId/events/:eventId/images', async (req, res) => {
//   const { venueId, eventId } = req.params;
//   const { imageUrl, like, dislike, love } = req.body;

//   try {
//     const venue = await Venue.findById(venueId);
//     if (!venue) {
//       return res.status(404).json({ message: 'Venue not found.' });
//     }

//     const event = venue.events.find(evt => evt._id.toString() === eventId);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found.' });
//     }

//     const image = event.eventImages.find(img => img.imageUrl === imageUrl);
//     if (!image) {
//       return res.status(404).json({ message: 'Event image not found.' });
//     }

//     // Update counts
//     image.like = like;
//     image.dislike = dislike;
//     image.love = love;

//     await venue.save();
//     res.status(200).json({ message: 'Event image counts updated successfully', venue });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error: ' + err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Venue = require('../models/modal1');

// Middleware for validating new venue data
const validateVenueData = (req, res, next) => {
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

  next();
};

// GET all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.find();
    if (venues.length === 0) {
      return res.status(404).json({ message: 'No venues found.' });
    }
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: `Error fetching venues: ${err.message}` });
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
    res.status(500).json({ message: `Error fetching venue: ${err.message}` });
  }
});

// POST new venue (with validation middleware)
router.post('/', validateVenueData, async (req, res) => {
  const {
    name, address, description, height, weight, width,
    days, type, category, images, events, community
  } = req.body;

  const newVenue = new Venue({
    name, address, description, height, weight, width, days, community,
    type, category, images, events
  });

  try {
    const savedVenue = await newVenue.save();
    res.status(201).json(savedVenue);
  } catch (err) {
    console.error('Error saving venue:', err);
    res.status(500).json({ message: `Error saving venue: ${err.message}` });
  }
});

// PUT: Update counts for an image in venue
router.put('/:venueId/images', async (req, res) => {
  const { venueId } = req.params;
  const { imageUrl, like, dislike, love } = req.body;

  try {
    // Use $set for updating only the required fields
    const updateFields = {};
    if (typeof like === 'number') updateFields['images.$.like'] = like;
    if (typeof dislike === 'number') updateFields['images.$.dislike'] = dislike;
    if (typeof love === 'number') updateFields['images.$.love'] = love;

    const venue = await Venue.findOneAndUpdate(
      { _id: venueId, 'images.imageUrl': imageUrl },
      { $set: updateFields },
      { new: true }
    );

    if (!venue) {
      return res.status(404).json({ message: 'Venue or image not found.' });
    }

    res.status(200).json({ message: 'Image counts updated successfully', venue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});

// POST request to update like, dislike, or love count for an image
router.post('/api/venue/:venueId/:eventId/:imageId', async (req, res) => {
  const { venueId, eventId, imageId } = req.params;
  const { action } = req.body; // action can be 'like', 'dislike', or 'love'

  try {
    // Find the venue by venueId
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    // Find the event by eventId
    const event = venue.events.id(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Find the specific image by imageId
    const image = event.eventImages.id(imageId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
console.log(venue, event, image, 'evievievi')
    // Increment the appropriate count based on the action
    if (action === 'like') {
      image.like += 1;
    } else if (action === 'dislike') {
      image.dislike += 1;
    } else if (action === 'love') {
      image.love += 1;
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    // Save the updated venue
    await venue.save();

    res.status(200).json({ message: `${action} count updated successfully`, image });
  } catch (error) {
    console.error('Error updating count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

