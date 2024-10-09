import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardMedia } from '@mui/material';
import { SliderData } from './Slider';

const BannerSlider1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4); // Cycle through the top 3 images
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Sort images by likes in descending order and take the top 3
  const sortedImages = SliderData.sort((a, b) => Number(b.like) - Number(a.like)).slice(0, 4);

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      {sortedImages.map((image, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <Card
            sx={{
              height: '300px', // Fixed height for the card
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              border: '2px solid #000',
              position: 'relative',
            }}
          >
            <CardMedia
              component="img"
              image={image.image}
              alt={`Slide ${index + 1}`}
              sx={{
                height: '200px', // Set a fixed height for images
                objectFit: 'cover',
                transition: 'all 1s ease-in-out',
                filter: index === currentIndex ? 'none' : 'blur(4px)', // Blur other images
              }}
            />
            {index === currentIndex && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginTop: '10px',
                  textAlign: 'center',
                }}
              >
                {image.title}
              </Typography>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BannerSlider1;

