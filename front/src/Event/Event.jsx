import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Grid, Card, CardMedia } from "@mui/material";
import EventLike from "../Components/EventLike";

const EventDetail = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [events, setEvents] = useState([]); // State to hold an array of events

  useEffect(() => {
    // Fetch the event details from your API using the event ID
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/venue/event/${id}`);
        const data = await response.json();
        setEvents(data); // Assuming the response is an array of events
        console.log(data, 'Events fetched from the API');
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (!events || events.length === 0) {
    return <div>Loading event details...</div>; // Loading state or no events message
  }

  return (
    <div>
      {events.map((event) => (
        <div key={event._id} style={{ marginBottom: '20px' }}>
          <Typography variant="h4">{event.name}</Typography>
          <Typography variant="body1">{event.description}</Typography>
          <Typography variant="body2">Category: {event.category}</Typography>
          <Typography variant="body2">Date: {new Date(event.date).toLocaleDateString()}</Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Images:
          </Typography>
          <Grid container spacing={2} mt={2}>
            {event.images && event.images.length > 0 ? (
              event.images.map((image, imgIndex) => (
                <Grid item xs={12} sm={4} key={imgIndex}>
                  <Card sx={{ height: "250px" }}>
                    <CardMedia
                      component="img"
                      image={image.imageUrl}
                      alt={`Image ${imgIndex + 1} for ${event.name}`}
                      sx={{
                        height: "100%",
                        width: "100%",
                        cursor: "pointer",
                        objectFit: "contain",
                      }}
                    />
                  </Card>
                  <EventLike
                  venueId={event.venueId} // Correctly passing the venueId from the event
                  imageId={image._id} // Assuming each image has a unique ID
                  initialLikes={image.like} // Assuming you have like counts in your image object
                  initialDislikes={image.dislike} // Assuming you have dislike counts in your image object
                  initialLoves={image.love} // Assuming you have love counts in your image object
                />
                </Grid>
              ))
            ) : (
              <Typography variant="body1" sx={{ mt: 2 }}>
                No images available for this event.
              </Typography>
            )}
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default EventDetail;
