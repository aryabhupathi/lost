import React, { useState, useCallback } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";

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
    images: [],
    events: [
      {
        // Initialize with one event
        eventName: "",
        eventOrganizer: "",
        eventDate: dayjs().format("YYYY-MM-DD"),
        eventDescription: "",
        eventImages: [],
      },
    ],
  });

  const [eventcount, seteventcount] = useState(1);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // const handleFileChange = async (event) => {
  //   const files = Array.from(event.target.files);
  
  //   // Convert each file to base64
  //   const imageArrayPromises = files.map(async (file) => {
  //     const base64 = await convertToBase64(file);
  //     return {
  //       imageUrl: base64, // Store base64 string instead of object URL
  //     };
  //   });
  
  //   // Wait for all promises to resolve
  //   const imageArray = await Promise.all(imageArrayPromises);
  
  //   setFormData({
  //     ...formData,
  //     images: imageArray,
  //   });
  // };
  
  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result); // Base64 string
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };
  
  // const handleAddEvent = () => {
  //   const newEvent = {
  //     eventName: "",
  //     eventOrganizer: "",
  //     eventDate: dayjs().format("YYYY-MM-DD"),
  //     eventDescription: "",
  //     eventImages: [],
  //   };
  //   setFormData({ ...formData, events: [...formData.events, newEvent] });
  //   seteventcount(eventcount + 1);
  // };

  // const handleEventChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const updatedEvents = formData.events.map((event, idx) =>
  //     idx === index ? { ...event, [name]: value } : event
  //   );
  //   setFormData({ ...formData, events: updatedEvents });
  // };

  // const handleEventFileChange = (e, index) => {
  //   const { files } = e.target;
  //   const updatedEvents = formData.events.map((event, idx) =>
  //     idx === index
  //       ? { ...event, eventImages: [...event.eventImages, ...files] }
  //       : event
  //   );
  //   setFormData({ ...formData, events: updatedEvents });
  // };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
  
    // Convert each file to base64
    const imageArrayPromises = files.map(async (file) => {
      const base64 = await convertToBase64(file);
      return { imageUrl: base64 }; // Store base64 string
    });
  
    // Wait for all promises to resolve
    const imageArray = await Promise.all(imageArrayPromises);
  
    setFormData({
      ...formData,
      images: imageArray,
    });
  };
  
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result); // Base64 string
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  const handleAddEvent = () => {
    const newEvent = {
      eventName: "",
      eventOrganizer: "",
      eventDate: dayjs().format("YYYY-MM-DD"),
      eventDescription: "",
      eventImages: [], // Event-specific images
    };
    setFormData({ ...formData, events: [...formData.events, newEvent] });
    seteventcount(eventcount + 1);
  };
  
  const handleEventChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEvents = formData.events.map((event, idx) =>
      idx === index ? { ...event, [name]: value } : event
    );
    setFormData({ ...formData, events: updatedEvents });
  };
  
  const handleEventFileChange = async (e, index) => {
    const files = Array.from(e.target.files);
  
    // Convert event images to base64
    const base64Promises = files.map(async (file) => {
      const base64 = await convertToBase64(file);
      return { imageUrl: base64 };
    });
  
    const base64Images = await Promise.all(base64Promises);
  
    const updatedEvents = formData.events.map((event, idx) =>
      idx === index
        ? { ...event, eventImages: [...event.eventImages, ...base64Images] }
        : event
    );
  
    setFormData({ ...formData, events: updatedEvents });
  };
  

  const handleDeleteEvent = (index) => {
    const updatedEvents = formData.events.filter((_, idx) => idx !== index);
    setFormData({ ...formData, events: updatedEvents });
    seteventcount(eventcount - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Submitting form data:', formData);
  
    try {
      const response = await fetch("http://localhost:5000/api/venue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Stringify formData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit");
      }
  
      const data = await response.json();
      console.log("Form submitted successfully:", data);
      alert("Venue submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form: " + error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <Typography>Name</Typography>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <Typography>Community</Typography>
          <TextField
            label="Community"
            name="community"
            value={formData.community}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <Typography>Address</Typography>
          <TextField
            label="Address"
            name="address"
            minRows={3}
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <Typography>Description</Typography>
          <TextField
            label="Description"
            name="description"
            minRows={3}
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <Typography>Height</Typography>
          <TextField
            label="Height"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <Typography>Weight</Typography>
          <TextField
            label="Weight"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <Typography>Width</Typography>
          <TextField
            label="Width"
            name="width"
            type="number"
            value={formData.width}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <Typography>Days</Typography>
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

        <Grid item size={{ xs: 12, sm: 4 }}>
          <Typography>Category</Typography>
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
              <MenuItem value="Indoor">Indoor</MenuItem>
              <MenuItem value="Outdoor">Outdoor</MenuItem>
              <MenuItem value="Indoor">Indoor</MenuItem>
              <MenuItem value="Outdoor">Outdoor</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <Typography>Type</Typography>
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

        <Grid item size={{ xs: 12 }}>
          <Typography>Upload Product Images</Typography>
          <TextField
            type="file"
            name="productImages"
            inputProps={{
              multiple: true,
            }}
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleAddEvent}>
            Add Another Event
          </Button>
        </Grid>
        <Grid item xs={12} margin={3} padding={3}>
          <hr />
          {formData.events.map((event, index) => (
            <React.Fragment key={index}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <Typography variant="h5">Event {index + 1}</Typography>

                <Button
                  onClick={() => handleDeleteEvent(index)}
                  variant="contained"
                  color="error"
                >
                  DELETE
                  <DeleteIcon />
                </Button>
              </Grid>
              <hr />
              <Grid container spacing={2} item xs={12}>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography>Event Name</Typography>
                  <TextField
                    label="Event Name"
                    name="eventName"
                    value={event.eventName}
                    onChange={(e) => handleEventChange(e, index)}
                    fullWidth
                  />
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography>Event Organizer</Typography>
                  <TextField
                    label="Event Organizer"
                    name="eventOrganizer"
                    value={event.eventOrganizer}
                    onChange={(e) => handleEventChange(e, index)}
                    fullWidth
                  />
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography>Event Date</Typography>
                  <TextField
                    label="Event Date"
                    name="eventDate"
                    type="date"
                    value={event.eventDate}
                    onChange={(e) => handleEventChange(e, index)}
                    fullWidth
                  />
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography>Event Description</Typography>
                  <TextField
                    label="Event Description"
                    name="eventDescription"
                    minRows={3}
                    value={event.eventDescription}
                    onChange={(e) => handleEventChange(e, index)}
                    fullWidth
                  />
                </Grid>

                <Grid item size={{ xs: 12, sm: 6 }}>
                  <Typography>Upload Event Images</Typography>
                  <TextField
                    type="file"
                    name="eventImages"
                    inputProps={{
                      multiple: true,
                    }}
                    onChange={(e) => handleEventFileChange(e, index)}
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
          <hr />
        </Grid>

        <Grid container spacing={2}>
          {/* Your form fields and event section remain unchanged */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddForm;
