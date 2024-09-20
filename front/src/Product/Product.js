import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Modal,
  Box,
  CardMedia,
  Pagination,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import AddForm from "../Components/AddForm";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Product = () => {
  const [data, setData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [loved, setLoved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageLikes, setCurrentImageLikes] = useState(0);
  const [currentImageDislikes, setCurrentImageDislikes] = useState(0);
  const [currentImageLoves, setCurrentImageLoves] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/venue");
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleViewMore = (id) => navigate(`/product/${id}`);

  const handleImageClick = (imageUrl, index, venueId) => {
    setSelectedImage(imageUrl);
    setSelectedVenueId(venueId);
    setCurrentImageIndex(index);

    const currentProduct = data.find((product) => product._id === venueId);
    if (currentProduct) {
      const imageDetails = currentProduct.images[index];
      setCurrentImageLikes(imageDetails.like);
      setCurrentImageDislikes(imageDetails.dislike);
      setCurrentImageLoves(imageDetails.love);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setCurrentImageIndex(0);
    setLiked(false);
    setDisliked(false);
    setLoved(false);
  };

  const updateImageCounts = async (
    venueId,
    imageUrl,
    like,
    dislike,
    love,
    days
  ) => {
    // const url = `/api/venues/${venueId}/images`; // Adjust the API route as needed
    const url = `http://localhost:5000/api/venue/${venueId}/images`;

    const data = { imageUrl, like, dislike, love, days };

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

  const handleButtonClick = (buttonType) => {
    let newLikeCount = currentImageLikes;
    let newDislikeCount = currentImageDislikes;
    let newLoveCount = currentImageLoves;

    if (buttonType === "like") {
      newLikeCount = liked ? currentImageLikes - 1 : currentImageLikes + 1;
      setLiked((prev) => !prev);
      if (disliked) setDisliked(false);
      setCurrentImageLikes(newLikeCount);
    } else if (buttonType === "dislike") {
      newDislikeCount = disliked
        ? currentImageDislikes - 1
        : currentImageDislikes + 1;
      setDisliked((prev) => !prev);
      if (liked) setLiked(false);
      setCurrentImageDislikes(newDislikeCount);
    } else if (buttonType === "love") {
      newLoveCount = loved ? currentImageLoves - 1 : currentImageLoves + 1;
      setLoved((prev) => !prev);
      setCurrentImageLoves(newLoveCount);
    }

    // Update all counts (like, dislike, love) in the backend
    updateImageCounts(
      selectedVenueId,
      selectedImage,
      newLikeCount,
      newDislikeCount,
      newLoveCount
    );
  };

  const handleNextImage = () => {
    const currentProduct = data.find(
      (product) => product._id === selectedVenueId
    );

    if (currentProduct) {
      const nextIndex = (currentImageIndex + 1) % currentProduct.images.length;
      const nextImage = currentProduct.images[nextIndex];
      setCurrentImageIndex(nextIndex);
      setSelectedImage(nextImage.imageUrl);
      setCurrentImageLikes(nextImage.like);
      setCurrentImageDislikes(nextImage.dislike);
      setCurrentImageLoves(nextImage.love);
    }
  };

  const handlePrevImage = () => {
    const currentProduct = data.find(
      (product) => product._id === selectedVenueId
    );

    if (currentProduct) {
      const prevIndex =
        (currentImageIndex - 1 + currentProduct.images.length) %
        currentProduct.images.length;
      const prevImage = currentProduct.images[prevIndex];
      setCurrentImageIndex(prevIndex);
      setSelectedImage(prevImage.imageUrl);
      setCurrentImageLikes(prevImage.like);
      setCurrentImageDislikes(prevImage.dislike);
      setCurrentImageLoves(prevImage.love);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Grid container spacing={3} margin={3} sx={{ flexDirection: "column" }}>
      {showAdd ? (
        <AddForm />
      ) : (
        <>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowAdd(true)}
            >
              ADD NEW
            </Button>
          </Grid>
          <Grid container spacing={3}>
            <Grid
              item
              size={{ xs: 12, sm: 3 }}
              sx={{
                borderRight: "3px solid red",
                paddingRight: 2,
                marginBottom: 2,
              }}
            >
              <Typography variant="h6">Filter</Typography>
              {/* Add your filter components or fields here */}
            </Grid>
            <Grid item size={{ xs: 12, sm: 9 }}>
              <Grid container spacing={3}>
                {currentItems.map((product) => (
                  <Grid item size={{ xs: 12, sm: 4 }} key={product.id}>
                    <Card
                      sx={{
                        height: "350px",
                        width: "250px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia sx={{ height: 140 }}>
                        <img
                          src={product.images[0]?.imageUrl}
                          alt="Product"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </CardMedia>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            maxHeight: "4.5em",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            lineHeight: "1.5em",
                          }}
                        >
                          {product.address}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          mt: "auto",
                          borderTop: "2px solid red",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleImageClick(
                              product.images[0]?.imageUrl,
                              0,
                              product._id
                            )
                          }
                        >
                          Like
                        </Button>
                        <Button onClick={() => handleViewMore(product._id)}>
                          View More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{ mt: 3 }}
              />
            </Grid>
          </Grid>
        </>
      )}

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
            <Button
              onClick={handlePrevImage}
              disabled={currentImageIndex === 0}
              sx={{
                position: "absolute",
                left: -40,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <ArrowBackIcon />
            </Button>
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: "100%", height: "auto", marginBottom: 16 }}
            />
            <Button
              onClick={handleNextImage}
              disabled={
                !selectedImage ||
                currentImageIndex ===
                  data.find((product) =>
                    product.images.some(
                      (image) => image.imageUrl === selectedImage
                    )
                  )?.images.length -
                    1
              }
              sx={{
                position: "absolute",
                right: -40,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <ArrowForwardIcon />
            </Button>
          </Box>
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
                <ThumbUpIcon sx={{ color: "green" }} />
              ) : (
                <ThumbUpOutlinedIcon sx={{ color: "green" }} />
              )}
              {currentImageLikes}
            </Button>
            <Button
              sx={{ mb: 1, flex: 1, mx: 0.5 }}
              onClick={() => handleButtonClick("dislike")}
            >
              {disliked ? (
                <ThumbDownIcon sx={{ color: "black" }} />
              ) : (
                <ThumbDownAltOutlinedIcon sx={{ color: "black" }} />
              )}
              {currentImageDislikes}
            </Button>
            <Button
              sx={{ mb: 1, flex: 1, mx: 0.5 }}
              onClick={() => handleButtonClick("love")}
            >
              {loved ? (
                <FavoriteIcon sx={{ color: "#e63946" }} />
              ) : (
                <FavoriteBorderOutlinedIcon sx={{ color: "#e63946" }} />
              )}
              {currentImageLoves}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Product;
