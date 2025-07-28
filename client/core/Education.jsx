import React, { useEffect, useState } from "react";
import {
  getQualifications,
  createQualification,
  updateQualification,
  deleteQualification,
} from "../lib/qualification-api.js";
import auth from "../lib/auth-helper.js";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Grid,
} from "@mui/material";

export default function Education() {
  const [qualifications, setQualifications] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const isAdmin = auth.isAdmin();

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      const data = await getQualifications();
      setQualifications(data || []);
    } catch (err) {
      console.error("Failed to fetch qualifications:", err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let savedQualification;
      if (editingId) {
        savedQualification = await updateQualification(editingId, formData);
        setQualifications((prev) =>
          prev.map((q) => (q._id === editingId ? savedQualification : q))
        );
      } else {
        savedQualification = await createQualification(formData);
        if (savedQualification && savedQualification._id) {
          setQualifications((prev) => [...prev, savedQualification]);
        }
      }
      // Reset form
      setFormData({
        title: "",
        firstname: "",
        lastname: "",
        email: "",
        completion: "",
        description: "",
      });
      setEditingId(null);
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  const handleEdit = (q) => {
    setEditingId(q._id);
    setFormData({
      title: q.title,
      firstname: q.firstname,
      lastname: q.lastname,
      email: q.email,
      completion: q.completion ? q.completion.slice(0, 10) : "",
      description: q.description,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteQualification(id);
      setQualifications((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        textAlign: "left",
        color: "#646cff",
        mb: 4,
      }}
      >
        Education and Qualifications
      </Typography>

      {/* Admin-only Form */}
      {isAdmin && (
        <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Completion Date"
                name="completion"
                type="date"
                value={formData.completion}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              {editingId ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
      )}

      {/* List of Qualifications */}
      <Grid container spacing={3}>
        {qualifications.map((q) => (
          <Grid item xs={12} md={6} key={q._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{q.title}</Typography>
                <Typography variant="body2">
                  Name: {q.firstname} {q.lastname}
                </Typography>
                <Typography variant="body2">Email: {q.email}</Typography>
                <Typography variant="body2">
                  Completion: {new Date(q.completion).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {q.description}
                </Typography>
              </CardContent>

              {/* Admin-only Actions */}
              {isAdmin && (
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(q)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(q._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}