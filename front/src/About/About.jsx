// import React from 'react';
// import { Container, Typography, Box, Avatar } from '@mui/material';
// import Grid from  '@mui/material/Grid2';


// const About = () => {
//   const styles = {
//     root: {
//       backgroundColor: '#f9f9f9',
//       padding: '32px',
//         backgroundImage: `url(/download11.jpeg)`,
//     },
//     heading: {
//       marginBottom: '32px',
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//     content: {
//       marginBottom: '16px',
//     },
//     avatar: {
//       width: '120px',
//       height: '120px',
//       marginBottom: '16px',
//     },
//     section: {
//       marginBottom: '32px',
//     },
//   };

//   return (
//     <Grid style={styles.root} maxWidth="md">
//       <Typography variant="h3" style={styles.heading}>
//         About Us
//       </Typography>

//       <Box style={styles.section}>
//         <Typography variant="h5" gutterBottom>
//           Who We Are
//         </Typography>
//         <Typography variant="body1" style={styles.content}>
//           We are a dedicated team of professionals committed to delivering high-quality services to our clients. 
//           With years of experience in the industry, we take pride in our ability to offer innovative solutions 
//           that meet the evolving needs of our customers.
//         </Typography>
//       </Box>

//       <Box style={styles.section}>
//         <Typography variant="h5" gutterBottom>
//           Our Mission
//         </Typography>
//         <Typography variant="body1" style={styles.content}>
//           Our mission is to provide top-notch services and solutions that empower our clients to achieve their goals.
//           We are driven by the passion for excellence and the desire to make a positive impact through our work.
//         </Typography>
//       </Box>

//       <Box style={styles.section}>
//         <Typography variant="h5" gutterBottom>
//           Our Team
//         </Typography>
//         <Grid container spacing={4}>
//           <Grid item size={{xs:6, sm:4}}>
//             <Avatar
//               alt="Team Member 1"
//               src="/images/member1.jpg"
//               style={styles.avatar}
//             />
//             <Typography variant="h6">John Doe</Typography>
//             <Typography variant="body2">CEO & Founder</Typography>
//           </Grid>
//           <Grid item size={{xs:6, sm:4}}>
//             <Avatar
//               alt="Team Member 2"
//               src="/images/member2.jpg"
//               style={styles.avatar}
//             />
//             <Typography variant="h6">Jane Smith</Typography>
//             <Typography variant="body2">CTO</Typography>
//           </Grid>
//           <Grid item size={{xs:6, sm:4}}>
//             <Avatar
//               alt="Team Member 3"
//               src="/images/member3.jpg"
//               style={styles.avatar}
//             />
//             <Typography variant="h6">Alice Johnson</Typography>
//             <Typography variant="body2">Head of Operations</Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </Grid>
//   );
// };

// export default About;


import React from 'react';
import { Container, Typography, Box, Avatar, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';

const About = () => {
  const styles = {
    root: {
      backgroundColor: '#f9f9f9',
      padding: '32px',
      minHeight: '100vh', // Ensure it covers the full height
      backgroundImage: `url(/download11.jpeg)`,
      backgroundSize: 'cover', // Cover the entire area
      backgroundPosition: 'center', // Center the image
      display: 'flex',
      flexDirection: 'column',
    },
    heading: {
      marginBottom: '32px',
      fontWeight: 'bold',
      textAlign: 'center',justifyContent:'center'
    },
    content: {
      marginBottom: '16px',
    },
    avatar: {
      width: '120px',
      height: '120px',
      marginBottom: '16px',
    },
    section: {
      marginBottom: '32px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: add a white background with transparency for readability
      padding: '16px', // Add some padding for the sections
      borderRadius: '8px', // Optional: round the corners
    },
  };

  return (
    <Grid style={styles.root} container justifyContent="center">
      <Typography variant="h3" style={styles.heading}>
        About Us
      </Typography>

      <Box style={styles.section}>
      <Grid sx={{display:'flex', justifyContent:'center'}}>
        <Typography variant="h5" gutterBottom sx ={{textDecoration:'underline'}}>
          Who We Are
        </Typography></Grid>
        <Typography variant="body1" style={styles.content}>
          We are a dedicated team of professionals committed to delivering high-quality services to our clients. 
          With years of experience in the industry, we take pride in our ability to offer innovative solutions 
          that meet the evolving needs of our customers.
        </Typography>
      </Box>

      <Box style={styles.section}>
      <Grid sx={{display:'flex', justifyContent:'center'}}>
        <Typography variant="h5" gutterBottom sx ={{textDecoration:'underline'}}>
          Our Mission
        </Typography></Grid>
        <Typography variant="body1" style={styles.content}>
          Our mission is to provide top-notch services and solutions that empower our clients to achieve their goals.
          We are driven by the passion for excellence and the desire to make a positive impact through our work.
        </Typography>
      </Box>

      <Box style={styles.section}>
      <Grid sx={{display:'flex', justifyContent:'center'}}>
        <Typography variant="h5" gutterBottom sx ={{textDecoration:'underline'}}>
          Our Team
        </Typography></Grid>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4}>
            <Avatar
              alt="Team Member 1"
              src="/images/member1.jpg"
              style={styles.avatar}
            />
            <Typography variant="h6">ARYA</Typography>
            <Typography variant="body2">CEO & Founder</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Avatar
              alt="Team Member 2"
              src="/images/member2.jpg"
              style={styles.avatar}
            />
            <Typography variant="h6">SRUJANA</Typography>
            <Typography variant="body2">CTO</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Avatar
              alt="Team Member 3"
              src="/images/member3.jpg"
              style={styles.avatar}
            />
            <Typography variant="h6">LOKESH</Typography>
            <Typography variant="body2">Head of Operations</Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default About;
