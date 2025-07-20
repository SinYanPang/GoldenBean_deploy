import React, { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../lib/project-api.js";
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
import auth from "../lib/auth-helper.js";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  const isAdmin = auth.isAdmin(); // Check if current user is admin

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let savedProject;

      if (editingId) {
        savedProject = await updateProject(editingId, formData);
        setProjects((prev) =>
          prev.map((p) => (p._id === editingId ? savedProject : p))
        );
      } else {
        savedProject = await createProject(formData);
        if (savedProject && savedProject._id) {
          setProjects((prev) => [...prev, savedProject]);
        }
      }

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

  const handleEdit = (p) => {
    setEditingId(p._id);
    setFormData({
      title: p.title,
      firstname: p.firstname,
      lastname: p.lastname,
      email: p.email,
      completion: p.completion ? p.completion.slice(0, 10) : "",
      description: p.description,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>

      {/* Admin-Only Form */}
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

      {/* Project Cards */}
      <Grid container spacing={3}>
        {projects.map((p) => (
          <Grid item xs={12} md={6} key={p._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography variant="body2">
                  Name: {p.firstname} {p.lastname}
                </Typography>
                <Typography variant="body2">Email: {p.email}</Typography>
                <Typography variant="body2">
                  Completion: {new Date(p.completion).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {p.description}
                </Typography>
              </CardContent>

              {/* Admin-Only Actions */}
              {isAdmin && (
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(p._id)}
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