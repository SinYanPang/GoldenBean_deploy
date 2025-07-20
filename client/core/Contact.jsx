import React, { useEffect, useState } from "react";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../lib/contact-api.js";
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

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [editingId, setEditingId] = useState(null);

  const isAdmin = auth.isAdmin();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data || []);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let savedContact;

      if (editingId) {
        savedContact = await updateContact(editingId, formData);
        setContacts((prev) =>
          prev.map((c) => (c._id === editingId ? savedContact : c))
        );
      } else {
        savedContact = await createContact(formData);
        if (savedContact && savedContact._id) {
          setContacts((prev) => [...prev, savedContact]);
        }
      }

      setFormData({ firstname: "", lastname: "", email: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  const handleEdit = (c) => {
    setEditingId(c._id);
    setFormData({
      firstname: c.firstname,
      lastname: c.lastname,
      email: c.email,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" gutterBottom>
        Contacts
      </Typography>

      {/* Only Admins Can Add/Edit */}
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
          </Grid>
          <Box sx={{ marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              {editingId ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
      )}

      {/* List of Contacts */}
      <Grid container spacing={3}>
        {contacts.map((c) => (
          <Grid item xs={12} md={6} key={c._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {c.firstname} {c.lastname}
                </Typography>
                <Typography variant="body2">Email: {c.email}</Typography>
              </CardContent>
              {/* Only Admins Can Edit/Delete */}
              {isAdmin && (
                <CardActions>
                  <Button size="small" onClick={() => handleEdit(c)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(c._id)}
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
