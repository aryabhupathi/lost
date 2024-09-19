import React, { useState } from "react";
import { Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, IconButton } from "@mui/material";
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';

const AddForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    community: "",
    address: "",
    description: "",
    height: "",
    weight: "",
    width: "",
    days: "",
    category: "",
    type: "",
    productImages: [],
    events: [{ // Initialize with one event
      eventName: "",
      eventOrganizer: "",
      eventDate: dayjs().format("YYYY-MM-DD"),
      eventDescription: "",
      eventImages: [],
    }],
  });

  const [showEventSection, setShowEventSection] = useState(true); // Initially show the event section

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: [...formData[name], ...files] });
  };

  const handleAddEvent = () => {
    const newEvent = {
      eventName: "",
      eventOrganizer: "",
      eventDate: dayjs().format("YYYY-MM-DD"),
      eventDescription: "",
      eventImages: [],
    };
    setFormData({ ...formData, events: [...formData.events, newEvent] });
  };

  const handleEventChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEvents = formData.events.map((event, idx) =>
      idx === index ? { ...event, [name]: value } : event
    );
    setFormData({ ...formData, events: updatedEvents });
  };

  const handleEventFileChange = (e, index) => {
    const { files } = e.target;
    const updatedEvents = formData.events.map((event, idx) =>
      idx === index ? { ...event, eventImages: [...event.eventImages, ...files] } : event
    );
    setFormData({ ...formData, events: updatedEvents });
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = formData.events.filter((_, idx) => idx !== index);
    setFormData({ ...formData, events: updatedEvents });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>ADD</h3>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Community"
            name="community"
            value={formData.community}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Height"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Weight"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Width"
            name="width"
            type="number"
            value={formData.width}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Days</InputLabel>
            <Select
              label="Days"
              name="days"
              value={formData.days}
              onChange={handleInputChange}
            >
              <MenuItem value={1}>1 Day</MenuItem>
              <MenuItem value={2}>2 Days</MenuItem>
              <MenuItem value={3}>3 Days</MenuItem>
              <MenuItem value={4}>4 Days</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <MenuItem value="Indoor">Indoor</MenuItem>
              <MenuItem value="Outdoor">Outdoor</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <MenuItem value="Conference">Conference</MenuItem>
              <MenuItem value="Wedding">Wedding</MenuItem>
              <MenuItem value="Concert">Concert</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button variant="contained" component="label">
            Upload Product Images
            <input
              type="file"
              name="productImages"
              hidden
              multiple
              onChange={handleFileChange}
            />
          </Button>
        </Grid>

        {showEventSection && formData.events.map((event, index) => (
          <React.Fragment key={index}>
            <Grid container spacing={2} item xs={12}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Event Name"
                  name="eventName"
                  value={event.eventName}
                  onChange={(e) => handleEventChange(e, index)}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Event Organizer"
                  name="eventOrganizer"
                  value={event.eventOrganizer}
                  onChange={(e) => handleEventChange(e, index)}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Event Date"
                  name="eventDate"
                  type="date"
                  value={event.eventDate}
                  onChange={(e) => handleEventChange(e, index)}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Event Description"
                  name="eventDescription"
                  value={event.eventDescription}
                  onChange={(e) => handleEventChange(e, index)}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button variant="contained" component="label">
                  Upload Event Images
                  <input
                    type="file"
                    name="eventImages"
                    hidden
                    multiple
                    onChange={(e) => handleEventFileChange(e, index)}
                  />
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <IconButton onClick={() => handleDeleteEvent(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </React.Fragment>
        ))}

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleAddEvent}
            disabled={!showEventSection}
          >
            Add Another Event
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => setShowEventSection(!showEventSection)}
          >
            {showEventSection ? "Hide Event Section" : "Add Event"}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddForm;
