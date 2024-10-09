import React from 'react';
import { Grid, Card, Typography, Box, Avatar } from '@mui/material';

const ReviewSection = () => {
  return (
    <Box
      sx={{
        padding: '40px',
        backgroundColor: '#99bfe8', // Light background color
      }}
    >
      {/* Review Cards Section */}
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              transition: 'transform 0.3s ease', // Smooth transition
              '&:hover': {
                transform: 'scale(1.05)', // Scale up on hover
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)', // Enhanced shadow on hover
              },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar
                alt="John Doe"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56, marginBottom: '10px' }}
              />
              <Typography variant="h6">John Doe</Typography>
            </Box>
            <Typography variant="body1" color="textSecondary">
              "Had an amazing time at the festival! The decorations and the energy were fantastic. Can't wait for the next one!"
            </Typography>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
              },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar
                alt="Jane Smith"
                src="/static/images/avatar/2.jpg"
                sx={{ width: 56, height: 56, marginBottom: '10px' }}
              />
              <Typography variant="h6">Jane Smith</Typography>
            </Box>
            <Typography variant="body1" color="textSecondary">
              "The event was well-organized, and the performances were mesmerizing. Loved every moment of it!"
            </Typography>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
              },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar
                alt="Alex Johnson"
                src="/static/images/avatar/3.jpg"
                sx={{ width: 56, height: 56, marginBottom: '10px' }}
              />
              <Typography variant="h6">Alex Johnson</Typography>
            </Box>
            <Typography variant="body1" color="textSecondary">
              "A truly unforgettable experience. The festival brought everyone together in such a beautiful way!"
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Contact Details Section */}
      <Grid container spacing={2} sx={{ marginTop: '40px', justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Contact Information
          </Typography>
          <Typography variant="body1">Name: Festival Organizer</Typography>
          <Typography variant="body1">Email: contact@festival.com</Typography>
          <Typography variant="body1">Phone: (123) 456-7890</Typography>
          <Typography variant="body1">Address: 123 Festival Lane, Party City, PC 12345</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewSection;
