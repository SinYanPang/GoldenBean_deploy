import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import auth from "../lib/auth-helper";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/Logo.jpg";

// Function to determine if a link is active
const isActiveStyle = (location, path) =>
  location.pathname === path
    ? {
        color: "#b87c4b",
        textDecoration: "underline",
        fontWeight: "bold",
      }
    : {
        color: "#35465f",
        textDecoration: "none",
      };

// Custom style for sign out "link" so it looks like the others
const signOutStyle = {
  color: "#35465f",
  textDecoration: "none",
  cursor: "pointer",
  fontWeight: "normal",
  fontFamily: "inherit",
  fontSize: "1rem",
  padding: 0,
  border: "none",
  background: "none",
};

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  // Utility to render tab with | separator (except after last)
  const renderNavTabs = () => {
    const tabs = [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Menu", to: "/menu" },
      { label: "Order", to: "/order" },
      { label: "OrderList", to: "/OrderList" },
    ];

    return tabs.map((tab, index) => (
      <React.Fragment key={tab.to}>
        <Link to={tab.to} style={isActiveStyle(location, tab.to)}>
          {tab.label}
        </Link>
        {index !== tabs.length - 1 && (
          <span style={{ color: "#35465f", margin: "0 8px" }}>|</span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        paddingY: 1,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {/* Logo */}
          <Box component="img" src={logo} alt="logo" sx={{ width: 100, height: 100 }} />

          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#35465f",
            }}
          >
            Golden Bean Cafe
          </Typography>

          {/* Main Navigation Tabs */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              color: "#35465f",
            }}
          >
            {renderNavTabs()}
          </Stack>

          {/* Auth-related Navigation */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              color: "#35465f",
              fontSize: "1rem",
            }}
          >
            {auth.isAuthenticated() ? (
              <>
                <Link
                  to={`/user/${auth.isAuthenticated().user._id}`}
                  style={isActiveStyle(
                    location,
                    `/user/${auth.isAuthenticated().user._id}`
                  )}
                >
                  MyProfile
                </Link>
                <span style={{ color: "#35465f", margin: "0 8px" }}>|</span>
                <span>Welcome, {auth.isAuthenticated().user.name}</span>
                <span style={{ color: "#35465f", margin: "0 8px" }}>|</span>
                {/* Sign Out styled as a link */}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => auth.clearJWT(() => navigate("/"))}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") auth.clearJWT(() => navigate("/"));
                  }}
                  style={signOutStyle}
                >
                  Sign Out
                </span>
              </>
            ) : (
              <>
                <Link to="/signin" style={isActiveStyle(location, "/signin")}>
                  Sign In
                </Link>
                <span style={{ color: "#35465f", margin: "0 8px" }}>|</span>
                <Link to="/signup" style={isActiveStyle(location, "/signup")}>
                  Sign Up
                </Link>
              </>
            )}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}