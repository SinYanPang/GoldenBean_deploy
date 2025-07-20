import auth from "./auth-helper.js";

const API_BASE = "/api/contacts";

// Public: Get all contacts
export const getContacts = async () => {
  const response = await fetch(API_BASE);
  return await response.json();
};

// Admin only: Create a contact
export const createContact = async (contact) => {
  const { token } = auth.isAuthenticated();
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // include token
    },
    body: JSON.stringify(contact),
  });
  return await response.json();
};

// Admin only: Update a contact
export const updateContact = async (id, contact) => {
  const { token } = auth.isAuthenticated();
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // include token
    },
    body: JSON.stringify(contact),
  });
  return await response.json();
};

// Admin only: Delete a contact
export const deleteContact = async (id) => {
  const { token } = auth.isAuthenticated();
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // include token
    },
  });
  return await response.json();
};
