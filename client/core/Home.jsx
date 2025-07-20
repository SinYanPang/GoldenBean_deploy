import React from "react";
import { Typography, Box, Button, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import formalPhoto from "../assets/images/formalPhoto.jpg";

const Home = () => {
  return (
    <Box sx={{ pt: 8, px: 3 }}>
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            color: "#646cff",
            mb: 4,
          }}
        >
          Welcome to my portfolio! I am Pang Sin Yan, Ada.
        </Typography>

        {/* Content: Text Left, Image Right */}
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
        >
          {/* Left: Text */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              I am a software engineering student studying in Centennial College.
              I aspire to design and develop innovative software applications and
              enterprise information systems that solve real-world problems and
              enhance user experiences.
            </Typography>
          </Grid>

          {/* Right: Photo */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={formalPhoto}
              alt="Pang Sin Yan"
              sx={{
                width: "100%",
                maxHeight: 400,
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
