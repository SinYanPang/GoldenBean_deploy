import auth from "./auth-helper.js";

const API = "http://localhost:3000/api/qualifications";

// Create Qualification (Admin only)
export const createQualification = async (qualification) => {
  const { token } = auth.isAuthenticated();

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // token added
      },
      body: JSON.stringify(qualification),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    return await res.json();
  } catch (err) {
    console.error("Create Error:", err.message);
    return null;
  }
};

// Get All Qualifications (Public)
export async function getQualifications() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch qualifications");
    }

    return data;
  } catch (err) {
    console.error("Get Error:", err.message);
    throw err;
  }
}

// Update Qualification (Admin only)
export const updateQualification = async (id, updatedData) => {
  const { token } = auth.isAuthenticated();

  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // token added
      },
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to update qualification");
    }

    return data;
  } catch (err) {
    console.error("Update Error:", err.message);
    throw err;
  }
};

// Delete Qualification (Admin only)
export const deleteQualification = async (id) => {
  const { token } = auth.isAuthenticated();

  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // token added
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to delete qualification");
    }

    return data;
  } catch (err) {
    console.error("Delete Error:", err.message);
    throw err;
  }
};
