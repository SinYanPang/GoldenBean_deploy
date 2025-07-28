import React, { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../lib/project-api.js";
import auth from "../lib/auth-helper.js";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import "./Project.css";

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
  const isAdmin = auth.isAdmin();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
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
        if (savedProject?._id) {
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

  const getImagePath = (title) => {
    const fileName = title?.toLowerCase().replace(/\s+/g, "-") + ".png";
    return `/images/${fileName}`;
  };

  return (
    <Box className="project-container">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            color: "#646cff",
            mb: 4,
          }}
        >
          Projects
        </Typography>

      {isAdmin && (
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="project-form"
        >
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
          <Button type="submit" variant="contained" color="primary">
            {editingId ? "Update" : "Add"}
          </Button>
        </Box>
      )}

      {/* Project List */}
      {projects.map((p) => (
        <div key={p._id} className="project-entry">
          <div className="project-image">
            <img
              src={getImagePath(p.title)}
              alt={p.title}
              onError={(e) => (e.target.src = "/images/default.jpg")}
              className="project-img"
            />
          </div>
          <div className="project-text">
            <h3>{p.title}</h3>
            <p><strong>Name:</strong> {p.firstname} {p.lastname}</p>
            <p><strong>Email:</strong> {p.email}</p>
            <p><strong>Completion:</strong> {new Date(p.completion).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {p.description}</p>
            {isAdmin && (
              <div className="project-actions">
                <Button onClick={() => handleEdit(p)} variant="outlined" sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(p._id)} color="error" variant="outlined">
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </Box>
  );
}
