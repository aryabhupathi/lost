import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Typography } from '@mui/material';
import { EventData } from './Slider';

const BannerSlider2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % EventData.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <Grid container sx={{ height: '75vh', display: 'flex' }}>
      {/* Left side: Image inside a card */}
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          height: '100%', // Full height of the container
        }}
      >
        <Card
          sx={{
            width: '75%', // Responsive card width
            maxWidth: '500px',
            height: '100%', // Adjust height to fit the container
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            clipPath: 'xywh(0 5px 100% 75% round 15% 0)',
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image={EventData[currentIndex].image}
            alt={`Event ${currentIndex + 1}`}
            sx={{
              objectFit: 'cover',
              transition: 'all 1s ease-in-out',
            }}
          />
        </Card>
      </Grid>

      {/* Right side: Text content */}
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center vertically
          alignItems: 'center', // Center horizontally
          backgroundColor: 'rgba(0,0,0,0.05)', // Light background for contrast
          height: '80%', // Full height of the container to match the left side
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#333',
            transition: 'all 1s ease-in-out',
            textAlign: 'center',
            padding: '0 20px',
            marginBottom: '10px', // Add margin for spacing
          }}
        >
          {EventData[currentIndex].title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: '1.2rem',
            color: '#555',
            textAlign: 'center',
            padding: '0 20px',
          }}
        >
          {EventData[currentIndex].description}
        </Typography>
      </Grid>
      <Grid xs={12}><Typography variant='h6' textAlign={'center'}>Not Sure</Typography></Grid>
    </Grid>
  );
};

export default BannerSlider2;
