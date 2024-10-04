import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  Modal,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Learn = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventIds, setEventIds] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [mainImageModal, setMainImageModal] = useState({
    open: false,
    imageUrl: "",
    likes: 0,
    dislikes: 0,
    loves: 0,
    imageId: "",
  });
  const [showAllImages, setShowAllImages] = useState(false);

  const handleImageModal = (image) => {
    setMainImageModal({
      imageId: image._id,
      open: true,
      imageUrl: image.imageUrl,
      likes: image.like,
      dislikes: image.dislike,
      loves: image.love,
    });
  };

  const handleCloseMainImageModal = () => {
    setMainImageModal({
      open: false,
      imageUrl: "",
      likes: 0,
      dislikes: 0,
      loves: 0,
    });
  };

  // Fetch product and event details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/venue/${id}`);
        const data = await response.json();
        console.log("Fetched product data:", data); // Log the product data
        setProduct(data);

        // Set current image if images exist
        if (data.images && data.images.length > 0) {
          setCurrentImage(data.images[0].imageUrl);
        }

        if (data.eventIds && data.eventIds.length > 0) {
          setEventIds(data.eventIds);
          console.log("Event IDs set:", data.eventIds); // Log event IDs
        }
      } catch (error) {
        console.error("Error fetching venue or events:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     if (eventIds.length === 0) return; // Exit if no event IDs

  //     setLoadingEvents(true); // Start loading
  //     try {
  //       const response = await fetch(`http://localhost:5000/api/venue/event/${eventIds}`);
  //       const data = await response.json();
  //       console.log("Fetched events data:", data); // Log the fetched events data
  //       setEvents(data);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     } finally {
  //       setLoadingEvents(false); // Stop loading
  //     }
  //   };

  //   fetchEvent();
  // }, [eventIds]); // Dependency on eventIds

  // Fetch Event data
useEffect(() => {
  const fetchEvent = async () => {
    if (eventIds.length === 0) return; // Exit if no event IDs

    try {
      const response = await fetch(`http://localhost:5000/api/venue/event/${eventIds}`);
      const data = await response.json();
      console.log("Fetched events data:", data); // Log the fetched events data

      // Wrap the data in an array if it's a single object
      const eventsToSet = Array.isArray(data) ? data : [data];

      setEvents(eventsToSet); // Set events
      console.log("Events set successfully:", eventsToSet); // Log the successfully set events
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  fetchEvent();
}, [eventIds]); 

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const updateImageCounts = async (venueId, imageUrl, like, dislike, love) => {
    const url = `http://localhost:5000/api/venue/${venueId}/images`;
    const data = { imageUrl, like, dislike, love };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.error("Error updating image counts:", errorMessage);
      } else {
        const updatedVenue = await response.json();
        console.log("Image counts updated successfully:", updatedVenue);
      }
    } catch (err) {
      console.error("Error making PUT request:", err.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        {product.address}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card elevation={2} sx={{ height: "300px" }}>
            {currentImage ? (
              <CardMedia
                component="img"
                image={currentImage}
                alt="Product Image"
                sx={{
                  height: "100%",
                  width: "100%",
                  cursor: "pointer",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Typography variant="h6" align="center" sx={{ padding: 4 }}>
                No images available
              </Typography>
            )}
          </Card>

          {/* Display product image thumbnails if images exist */}
          {product.images && product.images.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                borderRadius: "2px",
                marginTop: 1,
                border: "2px dotted gold",
                overflowX: "scroll",
              }}
            >
              {product.images.map((image, index) => (
                <Card
                  key={index}
                  sx={{ width: "80px", height: "80px", cursor: "pointer" }}
                  onClick={() => setCurrentImage(image.imageUrl)}
                >
                  <CardMedia
                    component="img"
                    image={image.imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No thumbnails available
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h5" gutterBottom>
            Key Features:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                Height: {product.height ? `${product.height} ft` : "N/A"}
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Weight: {product.weight ? `${product.weight} kg` : "N/A"}
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Width: {product.width ? `${product.width} ft` : "N/A"}
              </Typography>
            </li>
          </ul>

          <Typography variant="body1">{product.days} days</Typography>
          <Typography variant="body1">{product.category}</Typography>
          <Typography variant="body1">{product.type}</Typography>
        </Grid>
      </Grid>
      <hr />

      {/* <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Events
        </Typography>
        {loadingEvents ? (
          <Typography>Loading events...</Typography>
        ) : events.length > 0 ? (
          events.map((event, index) => (
            <Box key={index} sx={{ marginBottom: 4 }}>
              <Typography variant="h5" gutterBottom>
                {event.eventName}
              </Typography>
              <Typography variant="body1">{event.eventDescription}</Typography>
              <Typography variant="body2" color="textSecondary">
                Event Date: {event.eventDate}
              </Typography>

              <Grid container spacing={4}>
                {event.eventImages && event.eventImages.length > 0 ? (
                  event.eventImages
                    .slice(0, showAllImages ? event.eventImages.length : 5)
                    .map((image, imgIndex) => (
                      <Grid item xs={12} sm={4} mt={3} key={imgIndex}>
                        <Card sx={{ height: "250px" }}>
                          <CardMedia
                            component="img"
                            image={image.imageUrl}
                            alt={`Event Image ${imgIndex + 1}`}
                            sx={{
                              height: "100%",
                              width: "100%",
                              cursor: "pointer",
                              objectFit: "contain",
                            }}
                            onClick={() => handleImageModal(image)}
                          />
                        </Card>
                      </Grid>
                    ))
                ) : (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    No images available for this event.
                  </Typography>
                )}
                {event.eventImages && event.eventImages.length > 5 && (
                  <Button
                    color="primary"
                    onClick={() => setShowAllImages(!showAllImages)}
                  >
                    {showAllImages ? "View Less" : "View More"}
                  </Button>
                )}
              </Grid>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No events available</Typography>
        )}
      </Box> */}

<Box sx={{ marginTop: 4 }}>
  <Typography variant="h4" gutterBottom>
    Events
  </Typography>
  {events.length > 0 ? (
    events.map((event, index) => (
      <Box key={event._id} sx={{ marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          {event.name}
        </Typography>
        <Typography variant="body1">{event.description}</Typography>
        <Typography variant="body2" color="textSecondary">
          Event Date: {new Date(event.date).toLocaleDateString()} {/* Format the date */}
        </Typography>

        <Grid container spacing={4}>
          {event.images && event.images.length > 0 ? (
            event.images.slice(0, showAllImages ? event.images.length : 5).map((image, imgIndex) => (
              <Grid item xs={12} sm={4} mt={3} key={imgIndex}>
                <Card sx={{ height: "250px" }}>
                  <CardMedia
                    component="img"
                    image={image.imageUrl}
                    alt={`Event Image ${imgIndex + 1}`}
                    sx={{
                      height: "100%",
                      width: "100%",
                      cursor: "pointer",
                      objectFit: "contain",
                    }}
                    onClick={() => handleImageModal(image)}
                  />
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              No images available for this event.
            </Typography>
          )}
          {event.images && event.images.length > 5 && (
            <Button
              color="primary"
              onClick={() => setShowAllImages(!showAllImages)}
            >
              {showAllImages ? "View Less" : "View More"}
            </Button>
          )}
        </Grid>
      </Box>
    ))
  ) : (
    <Typography variant="body1">No events available</Typography>
  )}
</Box>

      <Modal
        open={mainImageModal.open}
        onClose={handleCloseMainImageModal}
        aria-labelledby="modal-image"
        aria-describedby="modal-image-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Close Button */}
          <Box sx={{ alignSelf: "flex-end", mb: 2 }}>
            <Button
              onClick={handleCloseMainImageModal}
              sx={{ minWidth: 0, p: 0 }}
            >
              <CloseIcon
                sx={{
                  color: "black",
                  "&:hover": {
                    color: "red",
                  },
                }}
              />
            </Button>
          </Box>

          {/* Image Section */}
          {mainImageModal.imageUrl ? (
            <CardMedia
              component="img"
              image={mainImageModal.imageUrl}
              alt="Main Image"
              sx={{
                objectFit: "contain",
                height: "400px",
                width: "400px",
                mb: 2,
              }}
            />
          ) : (
            <Typography variant="body1">No image available</Typography>
          )}

          {/* Interaction Buttons Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ fontWeight: "bold" }}>{mainImageModal.imageId}</Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button sx={{ minWidth: 0 }}>
                <ThumbUpIcon />
                {mainImageModal.likes}
              </Button>
              <Button sx={{ minWidth: 0 }}>
                <ThumbDownIcon />
                {mainImageModal.dislikes}
              </Button>
              <Button sx={{ minWidth: 0 }}>
                <FavoriteIcon />
                {mainImageModal.loves}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Learn;
