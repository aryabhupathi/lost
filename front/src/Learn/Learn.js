import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Box,
  Button,
  Modal,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Learn = () => {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedEventImages, setSelectedEventImages] = useState([]);
  const [selectedEventName, setSelectedEventName] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [loved, setLoved] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  // Function to open modal and set event images
  const handleOpenModal = (images, eventName) => {
    setSelectedEventImages(images);
    setSelectedEventName(eventName);
    setOpen(true);
  };

  const handleButtonClick = (buttonType) => {
    if (buttonType === "like") {
      setLiked((prev) => !prev);
      if (disliked) setDisliked(false);
    } else if (buttonType === "dislike") {
      setDisliked((prev) => !prev);
      if (liked) setLiked(false);
    } else if (buttonType === "love") {
      setLoved((prev) => !prev);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Fetch product details based on id
    fetch(`http://localhost:5000/api/venue/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        // Set the first image as the current image
        if (data.images.length > 0) {
          setCurrentImage(data.images[0].imageUrl);
        }
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>; // Loading state while fetching data
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4, border: "2px solid red" }}>
      <Typography variant="h2" align="center" gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        {product.address}
      </Typography>

      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <Card elevation={2} sx={{ height: "300px" }}>
            <img
              src={currentImage}
              alt="Current"
              style={{
                objectFit: "scale-down",
                width: "100%",
                height: "100%",
              }}
            />
          </Card>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 1 }}>
            {product.images.map((image, index) => (
              <Card
                key={index}
                sx={{ width: "80px", cursor: "pointer" }}
                onClick={() => setCurrentImage(image.imageUrl)}
              >
                <img
                  src={image.imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Card>
            ))}
          </Box>
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="body1">{product.community}</Typography>
          <Typography variant="h5" gutterBottom>
            Key Features:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">{product.height}</Typography>
            </li>
            <li>
              <Typography variant="body1">{product.weight}</Typography>
            </li>
            <li>
              <Typography variant="body1">{product.width}</Typography>
            </li>
          </ul>

          <Typography variant="body1">{product.days}</Typography>
          <Typography variant="body1">{product.category}</Typography>
          <Typography variant="body1">{product.type}</Typography>
        </Grid>
      </Grid>
      <hr />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Events
        </Typography>
        {product.events.map((event, index) => (
          <Box key={index} sx={{ marginBottom: 4 }}>
            <Typography variant="h5" gutterBottom>
              {event.eventName}
            </Typography>
            <Typography variant="body1">{event.eventDescription}</Typography>
            <Typography variant="body2" color="textSecondary">
              Event Date: {event.eventDate}
            </Typography>

            <Grid container spacing={4}>
              {/* Display only first 5 images */}
              {event.eventImages.slice(0, 5).map((image, imgIndex) => (
                <Grid item size={{ xs: 12, sm: 3 }} key={imgIndex}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={image.imageUrl}
                      alt={`Event Image ${imgIndex + 1}`}
                      sx={{ height: 200 }}
                    />
                  </Card>
                </Grid>
              ))}
              {event.eventImages.length > 5 && (
                <Button
                  onClick={() =>
                    handleOpenModal(event.eventImages, event.eventName)
                  }
                >
                  + See More
                </Button>
              )}
            </Grid>
            <hr />
          </Box>
        ))}
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1">
          Here you can answer some common questions about the product to help
          customers make informed decisions.
        </Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleCloseModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Grid
          sx={{
            maxHeight: "90vh",
            overflowY: "auto",
            backgroundColor: "white",
            padding: 4,
          }}
        >
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" gutterBottom>
              {selectedEventName}
            </Typography>

            <Button onClick={handleCloseModal} sx={{ marginTop: 2 }}>
              Close
            </Button>
          </Grid>
          <Grid container spacing={4}>
            {selectedEventImages.map((image, index) => (
              <Grid item size={{ xs: 12, sm: 6 }} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    image={image.imageUrl}
                    alt={`Event Image ${index + 1}`}
                    sx={{ height: 200 }}
                  />
                </Card>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    width: "100%",
                  }}
                >
                  <Button
                    sx={{ mb: 1, flex: 1, mx: 0.5 }}
                    onClick={() => handleButtonClick("like")}
                  >
                    {liked ? (
                      <ThumbUpIcon style={{ color: "green" }} />
                    ) : (
                      <ThumbUpOutlinedIcon />
                    )}
                  </Button>
                  <Button
                    sx={{ mb: 1, flex: 1, mx: 0.5 }}
                    onClick={() => handleButtonClick("dislike")}
                  >
                    {disliked ? (
                      <ThumbDownIcon style={{ color: "red" }} />
                    ) : (
                      <ThumbDownAltOutlinedIcon />
                    )}
                  </Button>
                  <Button
                    sx={{ mb: 1, flex: 1, mx: 0.5 }}
                    onClick={() => handleButtonClick("love")}
                  >
                    {loved ? (
                      <FavoriteIcon style={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Modal>
    </Container>
  );
};

export default Learn;
