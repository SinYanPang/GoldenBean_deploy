import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { create } from "./api-user";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    error: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, error: "" });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic client-side validation
    if (!values.password || values.password.length < 6) {
      setValues({ ...values, error: "Password must be at least 6 characters." });
      return;
    }

    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    console.log("Sending user data:", user);

    try {
      const data = await create(user);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setOpen(true);
        setValues({ name: "", email: "", password: "", error: "" });
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setValues({ ...values, error: "Signup failed. Please try again." });
    }
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: 400,
          margin: "0 auto",
          mt: 3,
          p: 2,
          textAlign: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Typography variant="h6" sx={{ fontSize: 18 }}>
              Sign Up
            </Typography>

            <TextField
              id="name"
              label="Name"
              sx={{ width: "100%", mb: 2 }}
              value={values.name}
              onChange={handleChange("name")}
              margin="normal"
              required
            />
            <TextField
              id="email"
              label="Email"
              sx={{ width: "100%", mb: 2 }}
              value={values.email}
              onChange={handleChange("email")}
              margin="normal"
              type="email"
              required
            />
            <TextField
              id="password"
              label="Password"
              sx={{ width: "100%", mb: 2 }}
              value={values.password}
              onChange={handleChange("password")}
              type="password"
              margin="normal"
              required
              helperText="Password must be at least 6 characters"
            />

            {values.error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {values.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              sx={{ margin: "0 auto", mb: 2 }}
            >
              Submit
            </Button>
          </CardActions>
        </form>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>New account successfully created.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button
              color="primary"
              autoFocus
              variant="contained"
              onClick={handleClose}
            >
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
