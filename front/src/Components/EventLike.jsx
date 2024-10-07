import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const EventLike = ({
  venueId,
  imageId,
  initialLikes,
  initialDislikes,
  initialLoves,
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [loved, setLoved] = useState(false);
  const [currentImageLikes, setCurrentImageLikes] = useState(initialLikes);
  const [currentImageDislikes, setCurrentImageDislikes] =
    useState(initialDislikes);
  const [currentImageLoves, setCurrentImageLoves] = useState(initialLoves);
  const handleButtonClick = (buttonType) => {
    let newLikeCount, newDislikeCount, newLoveCount;

    if (buttonType === "like") {
      newLikeCount = liked ? -1 : 1; // Send only 1 or -1 for likes
      setLiked((prev) => !prev);
      if (disliked) setDisliked(false); // reset dislike if like is toggled
    } else if (buttonType === "dislike") {
      newDislikeCount = disliked ? -1 : 1; // Send only 1 or -1 for dislikes
      setDisliked((prev) => !prev);
      if (liked) setLiked(false); // reset like if dislike is toggled
    } else if (buttonType === "love") {
      newLoveCount = loved ? -1 : 1; // Send only 1 or -1 for love
      setLoved((prev) => !prev);
    }
    updateImageCounts(
      venueId,
      imageId,
      newLikeCount,
      newDislikeCount,
      newLoveCount
    );
  };

  const updateImageCounts = async (venueId, imageId, like, dislike, love) => {
    const url = `http://localhost:5000/api/venue/event/${venueId}/images/${imageId}`;
    const data = { like, dislike, love };

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
        const updatedImage = await response.json();
        console.log("Image counts updated successfully:", updatedImage);
      }
    } catch (err) {
      console.error("Error making PUT request:", err.message);
    }
  };

  return (
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
  );
};

export default EventLike;
