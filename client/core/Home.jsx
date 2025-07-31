import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        textAlign: "center", 
        px: 2,
        mt: 8,                 
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#35465f", mb: 2 }}>
        Welcome to Golden Bean Cafe
      </Typography>

      <Typography variant="body1" sx={{ color: "#35465f", mb: 4 }}>
        A cozy place for coffee lovers to enjoy the finest brews and pastries.
      </Typography>

      <Link to="/about">
        <Button className="about-button">Learn More About Us</Button>
      </Link>
    </Box>
  );
};

export default Home;
