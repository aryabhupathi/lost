import React, { useState, useEffect, useRef } from 'react';
import { Button, Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const slideInterval = useRef(null);

  // Automatically change slides
  const startSlideTimer = () => {
    slideInterval.current = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3000); // Change every 3 seconds
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // Stop sliding on hover
  const handleMouseEnter = () => {
    clearInterval(slideInterval.current);
  };

  // Resume sliding when not hovered
  const handleMouseLeave = () => {
    startSlideTimer();
  };

  useEffect(() => {
    startSlideTimer();
    return () => {
      clearInterval(slideInterval.current);
    };
  }, []);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%', // Full width of the screen
        margin: '0 auto',
        overflow: 'hidden',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left Arrow */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          
          backgroundColor:'transparent',
          color: 'white',
          zIndex: 1,
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.8)',
          },
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor:'transparent',
          color: 'white',
          zIndex: 2,
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.8)',
          },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Slider Images */}
      {slides.map((slide, index) => (
        <Box
          component="div"
          key={index}
          sx={{
            opacity: index === current ? 1 : 0,
            transition: 'opacity 0.5s ease',
            height: '400px', // Reduced height
            display: index === current ? 'block' : 'none',
          }}
        >
          {index === current && (
            <img
              src={slide.image}
              alt="Festival slide"
              style={{
                width: '100%', // Full width of the screen
                height: '100%',
                objectFit: 'fill',
                borderRadius: '10px',
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Slider;


