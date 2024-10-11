import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  Pagination,
  CardMedia,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddForm from "../Components/AddForm";
import DisplayCard from "../Components/DisplayCard";
import Grid from "@mui/material/Grid2";
import style1 from "../Sstyle/Modal1";

const Product = () => {
  const [data, setData] = useState([]);
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
  const [showAdd, setShowAdd] = useState(false); // Control whether to show the AddForm

  // Function to hide the AddForm
  const handleHideAddForm = () => {
    setShowAdd(true); // Hide form after submission
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/venue");
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleViewMore = (id) => navigate(`/venue/${id}`);

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

  const handleButtonClick = (buttonType) => {
    let newLikeCount, newDislikeCount, newLoveCount;

    if (buttonType === "like") {
      newLikeCount = liked ? -1 : 1;
      setLiked((prev) => !prev);
      if (disliked) setDisliked(false);
      updateImageCounts(
        selectedVenueId,
        selectedImage,
        newLikeCount,
        undefined,
        undefined
      );
    } else if (buttonType === "dislike") {
      newDislikeCount = disliked ? -1 : 1;
      setDisliked((prev) => !prev);
      if (liked) setLiked(false);
      updateImageCounts(
        selectedVenueId,
        selectedImage,
        undefined,
        newDislikeCount,
        undefined
      );
    } else if (buttonType === "love") {
      newLoveCount = loved ? -1 : 1;
      setLoved((prev) => !prev);
      updateImageCounts(
        selectedVenueId,
        selectedImage,
        undefined,
        undefined,
        newLoveCount
      );
    }
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
    <Grid
      container
      spacing={3}
      sx={{ flexDirection: "column", backgroundImage: `url(/download11.jpeg)` }}
    >
      <Grid margin={3}>
        {showAdd ? (
          <AddForm showAdd={handleHideAddForm} />
        ) : (
          <Grid>
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
                onClick={() => setShowAdd(true)}
                sx={{backgroundColor:'pink', color:'black'}}
              >
                ADD NEW
              </Button>
            </Grid>
            {data.length > 0 ? (
              <DisplayCard
                currentItems={currentItems}
                handleImageClick={handleImageClick}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                handleViewMore={handleViewMore}
                totalItems={data.length}
              />
            ) : (
              <Grid item xs={12} display="flex" justifyContent="center">
                <p>No products available. Add new items to get started!</p>
              </Grid>
            )}
            <Grid xs={12} display={"flex"} justifyContent={"center"}>
              <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ mt: 3,backgroundColor:'pink', color:'black'}}
                disabled={data.length === 0}
              />
            </Grid>
          </Grid>
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
          <Box sx={style1}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {selectedImage ? (
                <Card>
                  <Button
                    onClick={handlePrevImage}
                    sx={{
                      position: "absolute",
                      left: -40,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    disabled={currentImageIndex === 0}
                  >
                    <ArrowBackIcon />
                  </Button>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    image={selectedImage}
                    sx={{ height: "300px", width: "500px", objectFit: "contain" }}
                  />
                  <Button
                    onClick={handleNextImage}
                    sx={{
                      position: "absolute",
                      right: -40,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    disabled={
                      data.find((product) => product._id === selectedVenueId)
                        ?.images.length === currentImageIndex + 1
                    }
                  >
                    <ArrowForwardIcon />
                  </Button>
                </Card>
              ) : (
                <p>No image available</p>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => handleButtonClick("like")}
                color="primary"
                startIcon={
                  liked ? (
                    <ThumbUpIcon sx={{ color: "green" }} />
                  ) : (
                    <ThumbUpOutlinedIcon sx={{ color: "green" }} />
                  )
                }
              >
                {currentImageLikes}
              </Button>
              <Button
                onClick={() => handleButtonClick("dislike")}
                color="primary"
                startIcon={
                  disliked ? (
                    <ThumbDownIcon sx={{ color: "yellow" }} />
                  ) : (
                    <ThumbDownAltOutlinedIcon sx={{ color: "yellow" }} />
                  )
                }
              >
                {currentImageDislikes}
              </Button>
              <Button
                onClick={() => handleButtonClick("love")}
                color="primary"
                startIcon={
                  loved ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon sx={{ color: "red" }} />
                  )
                }
              >
                {currentImageLoves}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default Product;
