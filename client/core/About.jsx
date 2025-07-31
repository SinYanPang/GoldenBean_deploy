import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left: Text */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#35465f", mb: 2 }}>
              About Golden Bean Cafe
            </Typography>
            <Typography variant="body1" sx={{ color: "#35465f", lineHeight: 1.7 }}>
              Welcome to Golden Bean Cafe, a cozy spot where great coffee meets warm hospitality.
              Whether you're grabbing a quick espresso, relaxing with a handcrafted latte,
              or enjoying fresh pastries and light bites, our café offers the perfect place
              to unwind, work, or catch up with friends. We are passionate about quality,
              community, and creating a space that feels like home.
            </Typography>
          </Grid>

          {/* Right: Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/Cafe.jpg" // from public/images
              alt="Cafe interior"
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

export default About;