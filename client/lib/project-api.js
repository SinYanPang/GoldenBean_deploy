import auth from "./auth-helper.js";

const API = "/api/projects";

// Public: Get all projects
export const getProjects = async () => {
  const res = await fetch(API);
  return await res.json();
};

// Admin only: Create a project
export const createProject = async (project) => {
  const { token } = auth.isAuthenticated();
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // add token
    },
    body: JSON.stringify(project),
  });
  return await res.json();
};

// Admin only: Update a project
export const updateProject = async (id, project) => {
  const { token } = auth.isAuthenticated();
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // add token
    },
    body: JSON.stringify(project),
  });
  return await res.json();
};

// Admin only: Delete a project
export const deleteProject = async (id) => {
  const { token } = auth.isAuthenticated();
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // add token
    },
  });
  return await res.json();
};
