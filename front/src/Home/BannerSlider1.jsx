import React, { useState, useEffect } from "react";
import { Grid, Typography, Card, CardMedia } from "@mui/material";

const BannerSlider1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topImages, setTopImages] = useState([]); // State to store the top images

  useEffect(() => {
    // Fetch top images from the API
    const fetchTopImages = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/venue/top-images"
        ); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTopImages(data); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching top images:", error);
      }
    };

    fetchTopImages();
  }, []); // Fetch data only on component mount

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4); // Cycle through the top 4 images
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  console.log(topImages, "ttttttttttttt");
  // Sort images by likes in descending order and take the top 4
  const sortedImages = topImages
    .sort((a, b) => Number(b.likes) - Number(a.likes))
    .slice(0, 4);

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center", padding: "20px" }}
    >
      {sortedImages.map((image, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <Card
            sx={{
              height: "300px", // Fixed height for the card
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              border: "2px solid #000",
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              image={image.imageUrl} // Use imageUrl from API response
              alt={`Slide ${index + 1}`}
              sx={{
                height: "300px", // Set a fixed height for images
                objectFit: "cover",
                transition: "all 1s ease-in-out",
                filter: index === currentIndex ? "none" : "blur(4px)", // Blur other images
              }}
            />
          </Card>
          {index === currentIndex && ( // Show address when this is the current image
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#333",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              {image.venueName} {/* Show venue name and address */}
            </Typography>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default BannerSlider1;
