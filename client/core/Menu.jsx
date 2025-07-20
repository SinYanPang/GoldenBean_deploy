import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import auth from "../lib/auth-helper";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo1.png"; // Ensure correct path

const isActive = (location, path) =>
  location.pathname === path ? "#646cff" : "#333";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        paddingY: 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Left: Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{ width: 60, height: 60 }}
          />
        </Box>


        {/* Right: Navigation Tabs */}
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Link to="/">
            <IconButton sx={{ color: isActive(location, "/") }}>
              <HomeIcon />
            </IconButton>
          </Link>

          <Link to="/education">
            <Button sx={{ color: isActive(location, "/education") }}>
              Education
            </Button>
          </Link>

          <Link to="/project">
            <Button sx={{ color: isActive(location, "/project") }}>
              Project
            </Button>
          </Link>

          <Link to="/contact">
            <Button sx={{ color: isActive(location, "/contact") }}>
              Contact
            </Button>
          </Link>

          {!auth.isAuthenticated() && (
            <>
              <Link to="/signup">
                <Button sx={{ color: isActive(location, "/signup") }}>
                  Sign up
                </Button>
              </Link>
              <Link to="/signin">
                <Button sx={{ color: isActive(location, "/signin") }}>
                  Sign in
                </Button>
              </Link>
            </>
          )}

          {auth.isAuthenticated() && (
            <>
              <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                <Button
                  sx={{
                    color: isActive(
                      location,
                      `/user/${auth.isAuthenticated().user._id}`
                    ),
                  }}
                >
                  My Profile
                </Button>
              </Link>
              <Button
                sx={{ color: "#333" }}
                onClick={() => {
                  auth.clearJWT(() => navigate("/"));
                }}
              >
                Sign out
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}