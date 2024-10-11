import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";

const AddForm = ({ showAdd }) => {
  const [venue, setVenue] = useState({
    name: "",
    community: "",
    address: "",
    description: "",
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
  const [venueSuccess, setVenueSuccess] = useState(false);
  const [eventSuccess, setEventSuccess] = useState(false);
  const [open, setOpen] = useState(false); // Control Snackbar open/close state
  const [vertical] = useState("top");
  const [horizontal] = useState("center");
  const [venueImages, setVenueImages] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false); // Close Snackbar
  };

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

  const handleVenueSubmit = async (e) => {
    e.preventDefault();

    // Basic validation check before submission
    const { name, community, address, description, days, type, category } =
      venue;
    if (
      !name ||
      !community ||
      !address ||
      !description ||
      !days ||
      !type ||
      !category
    ) {
      setErrorMessage("All fields are required!");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/venue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(venue),
      });

      if (!response.ok) {
        throw new Error("Failed to add venue");
      }

      const data = await response.json();
      console.log("Venue added:", data);

      // Assuming the backend responds with the created venue's ID
      setVenueId(data._id); // Set the venueId for future use
      setShowEventForm(true); // Show event form after venue creation

      // Show success feedback
      setVenueSuccess(true);
      setOpen(true);
      setTimeout(() => {
        setVenueSuccess(false);
      }, 2000);

      // Reset form
      setVenue({
        name: "",
        community: "",
        address: "",
        description: "",
        days: "",
        type: "",
        category: "",
        images: [],
        eventIds: [],
      });
      setVenueImages(null); // Reset image selection
    } catch (error) {
      console.error("Error adding venue:", error);
      setErrorMessage("An error occurred while adding the venue.");
      setOpenSnackbar(true);
    }
  };

  const validateEvents = () => {
    for (let i = 0; i < events.length; i++) {
      const { name, date, category } = events[i];
      if (!name || !date || !category) {
        setErrorMessage(`All fields are required for Event #${i + 1}`);
        setOpenSnackbar(true);
        return false;
      }
    }
    return true;
  };

  // Fetch venues and set venueId (though this function may not be necessary)
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/venue");
        const data = await response.json();
        console.log("Venues fetched:", data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    if (venueId === null) fetchVenues(); // Only fetch venues if venueId is null
  }, [venueId]);

  const closeSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!validateEvents()) return;

    try {
      const eventSubmissionPromises = events.map(async (eventDetails) => {
        const response = await fetch("http://localhost:5000/api/venue/event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...eventDetails,
            venueId: venueId,
          }),
        });

        const data = await response.json();
        console.log("Event added:", data);
      });

      await Promise.all(eventSubmissionPromises);
      setEventSuccess(true);
      setOpen(true);
      setTimeout(() => {
        setEventSuccess(false);
        setOpen(false);
        showAdd();
      }, 2000);
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
    setEvents([
      ...events,
      { name: "", description: "", date: "", images: [], category: "" },
    ]);
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
        <Grid item size={{ xs: 12, sm: 6 }}>
          <Typography>Name:</Typography>
          <TextField
            sx={{ background: "white" }}
            name="name"
            value={venue.name}
            onChange={handleVenueChange}
            fullWidth
            placeholder="Enter name"
            required
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <Typography>Community:</Typography>
          <TextField
            sx={{ background: "white" }}
            name="community"
            value={venue.community}
            onChange={handleVenueChange}
            fullWidth
            required
            placeholder="Enter community"
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <Typography>Address:</Typography>
          <TextField
            sx={{ background: "white" }}
            maxRows={5}
            multiline
            name="address"
            minRows={3}
            value={venue.address}
            onChange={handleVenueChange}
            fullWidth
            required
            placeholder="Enter address"
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <Typography>Description:</Typography>
          <TextField
            sx={{ background: "white" }}
            maxRows={5}
            multiline
            name="description"
            minRows={3}
            value={venue.description}
            onChange={handleVenueChange}
            fullWidth
            required
            placeholder="Enter description"
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <Typography>Days</Typography>
          <FormControl fullWidth required>
            <Select
              name="days"
              value={venue.days}
              onChange={handleVenueChange}
              sx={{ background: "white" }}
              placeholder="Select days"
            >
              {[1, 2, 3, 4].map((day) => (
                <MenuItem key={day} value={day}>
                  {day} Day{day > 1 ? "s" : ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <Typography>Category:</Typography>
          <FormControl fullWidth required>
            <Select
              name="category"
              value={venue.category}
              onChange={handleVenueChange}
              sx={{ background: "white" }}
              placeholder="Select category"
            >
              <MenuItem value="Indoor">Indoor</MenuItem>
              <MenuItem value="Outdoor">Outdoor</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <Typography>Type</Typography>
          <FormControl fullWidth required>
            <Select
              name="type"
              value={venue.type}
              onChange={handleVenueChange}
              sx={{ background: "white" }}
              placeholder="Select type"
            >
              <MenuItem value="Conference">Conference</MenuItem>
              <MenuItem value="Wedding">Wedding</MenuItem>
              <MenuItem value="Concert">Concert</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <Typography>Upload Venue Images</Typography>
          <TextField
            sx={{ width: "50%", background: "white" }}
            type="file"
            name="venueImages"
            inputProps={{
              multiple: true,
            }}
            onChange={handleFileChange}
          />
        </Grid>

        <Grid
          item
          size={{ xs: 12 }}
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        >
          <Button
            variant="contained"
            onClick={handleVenueSubmit}
            sx={{
              justifyContent: "center",
              backgroundColor: "pink",
              color: "black",
            }}
          >
            Submit Venue
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Event Form */}
      {showEventForm && (
        <form onSubmit={handleEventSubmit}>
          <Grid
            container
            spacing={2}
            sx={{ border: "1px dotted black", margin: 2, padding: 2 }}
          >
            {events.map((event, index) => (
              <Grid item container key={index} spacing={2}>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography>Event Name</Typography>
                  <TextField
                    placeholder="enter event name"
                    name="name"
                    value={event.name}
                    onChange={(e) => handleEventChange(e, index)}
                    fullWidth
                    required
                    sx={{ background: "white" }}
                  />
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography>Event Description</Typography>
                  <TextField
                    label="enter event description"
                    name="description"
                    value={event.description}
                    onChange={(e) => handleEventChange(e, index)}
                    fullWidth
                    // required
                    sx={{ background: "white" }}
                  />
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography>Event Date</Typography>
                  <TextField
                    name="date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={event.date}
                    onChange={(e) => handleEventChange(e, index)}
                    fullWidth
                    // required
                    sx={{ background: "white" }}
                  />
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography>Event Category</Typography>
                  <FormControl fullWidth required>
                    <Select
                      label="Category"
                      name="category"
                      value={event.category}
                      sx={{ background: "white" }}
                      onChange={(e) => handleEventChange(e, index)}
                    >
                      <MenuItem value="Workshop">Workshop</MenuItem>
                      <MenuItem value="Seminar">Seminar</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item size={{ xs: 12 }}>
                  <Typography>Upload Event Images</Typography>
                  <TextField
                    sx={{ width: "50%", background: "white" }}
                    type="file"
                    name="eventImages"
                    inputProps={{
                      multiple: true,
                    }}
                    onChange={(e) => handleEventFileChange(e, index)}
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 4 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddEvent}
                    sx={{ color: "white" }}
                  >
                    <AddIcon /> Add Event
                  </Button>
                </Grid>

                <Grid item size={{ xs: 12, sm: 4 }}>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteEvent(index)}
                    sx={{ color: "white" }}
                  >
                    Delete Event
                  </Button>
                </Grid>
              </Grid>
            ))}

            <Grid
              item
              size={{ xs: 12 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <Button
                variant="contained"
                onClick={handleEventSubmit}
                sx={{
                  justifyContent: "center",
                  backgroundColor: "pink",
                  color: "black",
                }}
              >
                Submit Event
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
      {venueSuccess && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={2000} // Hide after 2 seconds
          onClose={handleClose}
          message="Venue has been successfully added!"
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="success">
            Venue has been successfully added!
          </Alert>
        </Snackbar>
      )}
      {eventSuccess && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={2000} // Hide after 2 seconds
          onClose={handleClose}
          message="Venue has been successfully added!"
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="success">
            Event has been successfully added!
          </Alert>
        </Snackbar>
      )}
    </form>
  );
};

export default AddForm;
