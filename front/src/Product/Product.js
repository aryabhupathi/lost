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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [loved, setLoved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleImageClick = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
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

  const handleNextImage = () => {
    if (data.length > 0 && selectedImage) {
      const currentProduct = data.find((product) =>
        product.images.some((image) => image.imageUrl === selectedImage)
      );

      if (currentProduct) {
        const nextIndex =
          (currentImageIndex + 1) % currentProduct.images.length;
        setCurrentImageIndex(nextIndex);
        setSelectedImage(currentProduct.images[nextIndex]?.imageUrl);
      }
    }
  };

  const handlePrevImage = () => {
    if (data.length > 0) {
      const currentProduct = data.find((product) =>
        product.images.some((image) => image.imageUrl === selectedImage)
      );
      if (currentProduct) {
        const prevIndex =
          (currentImageIndex - 1 + currentProduct.images.length) %
          currentProduct.images.length;
        setCurrentImageIndex(prevIndex);
        setSelectedImage(currentProduct.images[prevIndex]?.imageUrl);
      }
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
                            handleImageClick(product.images[0]?.imageUrl, 0)
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
            </Grid>
          </Grid>
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
          />
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
            </Box>
          </Modal>
        </>
      )}
    </Grid>
  );
};

export default Product;
