import React from "react";
import Grid from "@mui/material/Grid";
import { Divider, Typography, Box, Button } from "@mui/material";
import BannerSlider2 from "./BannerSlider2";
import BannerSlider1 from "./BannerSlider1";
import Slider from "./MainSlider";
import { MainData } from "./Slider";
import ReviewSection from "./Review";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      xs={12}
      sx={{
        margin: "0", // Adjusted margin for the container
        display: "flex",
        flexDirection: "column",
        backgroundColor: "silver",
        backgroundImage: `url(/download11.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Full viewport height
        padding: 2,
        gap: 1,
      }}
    >
      {/* Header Section */}
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 3,
        }}
      >
        <Typography variant="h2" sx={{ color: "white", fontWeight: "bold" }}>
          Welcome to the Festival
        </Typography>
      </Grid>

      {/* Slogan Section */}
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#c67eed",
          padding: 3,
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "2.5rem",
            fontStyle: "italic",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #ff8a00, #e52e71)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Arial, sans-serif",
          }}
        >
          "Celebrate Joy, Light, and Togetherness"
        </Typography>
      </Grid>

      {/* Review Section */}
      <Grid
        item
        xs={12}
        sx={{
          padding: 4,
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <Slider slides={MainData} />
      </Grid>

      {/* Featured Event Section */}
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#63f783",
          padding: 3,
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ color: "black" }}>
            Featured Event
          </Typography>
          <Button
            variant="outlined"
            color="#254a32"
            onClick={() => {
              navigate("/venue");
            }}
          >
            <Typography variant="h5" sx={{ color: "black", cursor: "pointer" }}>
              See All
            </Typography>
          </Button>
        </Box>
        <Divider
          sx={{ backgroundColor: "#254a32", height: "2px", marginTop: 2 }}
        />
        <BannerSlider1 />
      </Grid>

      {/* Explore More Events Section */}
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "orange",
          padding: 2,
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          Explore More Events
        </Typography>
      </Grid>

      {/* Upcoming Events Section */}
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#e5f257",
          padding: 3,
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ color: "black" }}>
            Upcoming Events
          </Typography>
          <Button
            variant="outlined"
            color="#254a32"
            onClick={() => {
              navigate("/venue");
            }}
          >
            <Typography variant="h5" sx={{ color: "black", cursor: "pointer" }}>
              See All
            </Typography>
          </Button>
        </Box>
        <Divider
          orientation="horizantal"
          sx={{ backgroundColor: "#f2aa44", height: "2px", marginTop: 2, marginBottom:3 }}
        />
        <BannerSlider2 />
      </Grid>

      {/* Review Section */}
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#66aaf2",
          padding: 2,
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <ReviewSection />
      </Grid>
    </Grid>
  );
};

export default Home;
