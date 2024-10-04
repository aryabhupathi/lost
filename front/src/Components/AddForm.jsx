import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";

const AddForm = () => {
  const [venue, setVenue] = useState({
    name: "",
    community: "",
    address: "",
    description: "",
    height: "",
    weight: "",
    width: "",
    days: "",
    type: "",
    category: "",
    images: [],
    eventIds: [], 
  });

  const [events, setEvents] = useState([
    {
      name: "",
      description: "",
      date: "",
      images: [],
      category: "",
    },
  ]);

  const [venueId, setVenueId] = useState(null); 
  const [showEventForm, setShowEventForm] = useState(false); 

  // Handle venue input change
  const handleVenueChange = (e) => {
    setVenue({ ...venue, [e.target.name]: e.target.value });
  };

  // Handle event input change
  const handleEventChange = (e, index) => {
    const updatedEvents = events.map((event, idx) =>
      idx === index ? { ...event, [e.target.name]: e.target.value } : event
    );
    setEvents(updatedEvents);
  };

  // Handle venue form submit
  const handleVenueSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/venue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(venue),
      });

      const data = await response.json();
      console.log("Venue added:", data);
      setVenueId(data._id); // Set venueId from the created venue
      setShowEventForm(true); // Show event form after venue is created

      setVenue({
        name: "",
        community: "",
        address: "",
        description: "",
        height: "",
        weight: "",
        width: "",
        days: "",
        type: "",
        category: "",
        images: [],
        eventIds: [],
      });
    } catch (error) {
      console.error("Error adding venue:", error);
    }
  };

  // Fetch venues and set venueId (though this function may not be necessary)
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/venue');
        const data = await response.json(); 
        console.log("Venues fetched:", data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    if (venueId === null) fetchVenues(); // Only fetch venues if venueId is null
  }, [venueId]);

  // Handle event form submit
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventSubmissionPromises = events.map(async (eventDetails) => {
        const response = await fetch("http://localhost:5000/api/venue/event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...eventDetails,
            venueId: venueId, // Add venueId for the event
          }),
        });

        const data = await response.json();
        console.log("Event added:", data);
      });

      await Promise.all(eventSubmissionPromises); // Ensure all events are submitted
      console.log("All events submitted");
    } catch (error) {
      console.error("Error adding events:", error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result); 
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleAddEvent = () => {
    setEvents([...events, { name: "", description: "", date: "", images: [], category: "" }]);
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, idx) => idx !== index);
    setEvents(updatedEvents);
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);

    const imageArrayPromises = files.map(async (file) => {
      const base64 = await convertToBase64(file);
      return { imageUrl: base64, like: 0, dislike: 0, love: 0 }; 
    });

    const imageArray = await Promise.all(imageArrayPromises);

    setVenue({
      ...venue,
      images: imageArray, 
    });
  };

  const handleEventFileChange = async (event, index) => {
    const files = Array.from(event.target.files);

    const imageArrayPromises = files.map(async (file) => {
      const base64 = await convertToBase64(file);
      return { imageUrl: base64, like: 0, dislike: 0, love: 0 }; 
    });

    const imageArray = await Promise.all(imageArrayPromises);

    const updatedEvents = events.map((eventItem, idx) =>
      idx === index ? { ...eventItem, images: imageArray } : eventItem
    );
    setEvents(updatedEvents);
  };

  return (
    <form onSubmit={handleVenueSubmit}>
      <Grid container spacing={2}>
        {/* Venue Fields */}
        <Grid item size={{xs:12, sm:6}}>
          <Typography>Name</Typography>
          <TextField
            label="Name"
            name="name"
            value={venue.name}
            onChange={handleVenueChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item size={{xs:12, sm:6}}>
          <Typography>Community</Typography>
          <TextField
            label="Community"
            name="community"
            value={venue.community}
            onChange={handleVenueChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item size={{xs:12, sm:6}}>
          <Typography>Address</Typography>
          <TextField
            maxRows={5}
            multiline
            label="Address"
            name="address"
            minRows={3}
            value={venue.address}
            onChange={handleVenueChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item size={{xs:12, sm:6}}>
          <Typography>Description</Typography>
          <TextField
            maxRows={5}
            label="Description"
            multiline
            name="description"
            minRows={3}
            value={venue.description}
            onChange={handleVenueChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item size={{xs:12, sm:4}}>
          <Typography>Height</Typography>
          <TextField
            label="Height"
            name="height"
            type="number"
            value={venue.height}
            onChange={handleVenueChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item size={{xs:12, sm:4}}>
          <Typography>Weight</Typography>
          <TextField
            label="Weight"
            name="weight"
            type="number"
            value={venue.weight}
            onChange={handleVenueChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item size={{xs:12, sm:4}}>
          <Typography>Width</Typography>
          <TextField
            label="Width"
            name="width"
            type="number"
            value={venue.width}
            onChange={handleVenueChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item size={{xs:12, sm:4}}>
          <Typography>Days</Typography>
          <FormControl fullWidth required>
            <InputLabel>Days</InputLabel>
            <Select
              label="Days"
              name="days"
              value={venue.days}
              onChange={handleVenueChange}
            >
              {[1, 2, 3, 4].map((day) => (
                <MenuItem key={day} value={day}>
                  {day} Day{day > 1 ? "s" : ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item size={{xs:12, sm:4}}>
          <Typography>Category</Typography>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="category"
              value={venue.category}
              onChange={handleVenueChange}
            >
              <MenuItem value="Indoor">Indoor</MenuItem>
              <MenuItem value="Outdoor">Outdoor</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item size={{xs:12, sm:4}}>
          <Typography>Type</Typography>
          <FormControl fullWidth required>
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              name="type"
              value={venue.type}
              onChange={handleVenueChange}
            >
              <MenuItem value="Conference">Conference</MenuItem>
              <MenuItem value="Wedding">Wedding</MenuItem>
              <MenuItem value="Concert">Concert</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography>Upload Venue Images</Typography>
          <TextField
            sx={{ width: "50%" }}
            type="file"
            name="venueImages"
            inputProps={{
              multiple: true,
            }}
            onChange={handleFileChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleVenueSubmit}>
            Submit Venue
          </Button>
        </Grid>
      </Grid>

      {/* Event Form */}
      {showEventForm && (
        <form onSubmit={handleEventSubmit}>
          <Grid container spacing={2}>
            {events.map((event, index) => (
              <Grid item container key={index} spacing={2}>
                <Grid item size={{xs:12, sm:6}}>
                  <TextField
                    label="Event Name"
                    name="name"
                    value={event.name}
                    onChange={(e) => handleEventChange(e, index)}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item size={{xs:12, sm:6}}>
                  <TextField
                    label="Event Description"
                    name="description"
                    value={event.description}
                    onChange={(e) => handleEventChange(e, index)}
                    fullWidth
                    // required
                  />
                </Grid>

                <Grid item size={{xs:12, sm:6}}>
                  <TextField
                    label="Event Date"
                    name="date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={event.date}
                    onChange={(e) => handleEventChange(e, index)}
                    fullWidth
                    // required
                  />
                </Grid>

                <Grid item size={{xs:12, sm:6}}>
                  <Typography>Event Category</Typography>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      name="category"
                      value={event.category}
                      onChange={(e) => handleEventChange(e, index)}
                    >
                      <MenuItem value="Workshop">Workshop</MenuItem>
                      <MenuItem value="Seminar">Seminar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item size={{xs:12, sm:6}}>
                  <Typography>Upload Event Images</Typography>
                  <TextField
                    sx={{ width: "50%" }}
                    type="file"
                    name="eventImages"
                    inputProps={{
                      multiple: true,
                    }}
                    onChange={(e) => handleEventFileChange(e, index)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteEvent(index)}
                  >
                    Delete Event
                  </Button>
                </Grid>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button variant="contained" onClick={handleAddEvent}>
                Add Another Event
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                onClick={handleEventSubmit}
              >
                Submit Events
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </form>
  );
};

export default AddForm;
