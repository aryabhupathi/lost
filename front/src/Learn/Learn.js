import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Learn = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [mainImageModal, setMainImageModal] = useState({
    open: false,
    imageUrl: "",
    likes: 0,
    dislikes: 0,
    loves: 0,
    imageId: "",
  });
  const [showAllImages, setShowAllImages] = useState(false); // New state for toggling images

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

  useEffect(() => {
    fetch(`http://localhost:5000/api/venue/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.images.length > 0) {
          setCurrentImage(data.images[0].imageUrl);
        }
      })
      .catch((error) => console.error("Error fetching venue details:", error));
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        {product.address}
      </Typography>

      <Grid container spacing={4}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <Card elevation={2} sx={{ height: "300px" }}>
            <CardMedia
              component="img"
              image={currentImage}
              alt={`Event Image`}
              sx={{
                height: "100%",
                width: "100%",
                cursor: "pointer",
                objectFit: "contain",
              }}
            />
          </Card>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
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
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h5" gutterBottom>
            Key Features:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                Height: {product.height} ft
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Weight: {product.weight} kg
              </Typography>
            </li>
            <li>
              <Typography variant="body1">Width: {product.width} ft</Typography>
            </li>
          </ul>

          <Typography variant="body1">{product.days} days</Typography>
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
              {event.eventImages
                .slice(0, showAllImages ? event.eventImages.length : 5)
                .map((image, imgIndex) => (
                  <Grid item size={{ xs: 12, sm: 4 }} mt={3} key={imgIndex}>
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
                ))}
              {event.eventImages.length > 5 && (
                <Button
                  color="primary"
                  onClick={() => setShowAllImages(!showAllImages)} // Toggle showAllImages state
                >
                  {showAllImages ? "View Less" : "View More"}
                </Button>
              )}
            </Grid>
          </Box>
        ))}
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
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            maxHeight: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCloseMainImageModal}>
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
          <Box sx={{ border: "2px solid red" }}>
            <CardMedia
              component="img"
              image={mainImageModal.imageUrl}
              alt="Main Image"
              sx={{ objectFit: "contain", height: "400px", width: "500px" }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {mainImageModal.imageId}
              <Button>
                <ThumbUpIcon />
                {mainImageModal.likes}
              </Button>
              <Button>
                <ThumbDownIcon />
                {mainImageModal.dislikes}
              </Button>
              <Button>
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
