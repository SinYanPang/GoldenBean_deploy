const API = "/api/orders";

// Get all orders (public)
export const getOrders = async () => {
  const res = await fetch(API);
  return await res.json();
};

// Create a new order (public)
export const createOrder = async (order) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  return await res.json();
};

// Update an existing order by ID (public)
export const updateOrder = async (id, order) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  return await res.json();
};

// Delete an order by ID (public)
export const deleteOrder = async (id) => {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
