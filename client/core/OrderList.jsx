import React, { useEffect, useState } from "react";
import { getOrders, deleteOrder, updateOrder } from "../lib/api-order.js";
import auth from "../lib/auth-helper.js"; // ✅ Import auth helper
import "./OrderList.css";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    drink: "",
    dineIn: false,
  });

  const isAdmin = auth.isAdmin(); // ✅ Check if user is admin

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch orders.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await deleteOrder(id);
      fetchOrders();
    } catch (err) {
      setError("Failed to delete order.");
    }
  };

  const startEdit = (order) => {
    setEditingOrderId(order._id);
    setEditForm({
      name: order.name,
      drink: order.drink,
      dineIn: order.dineIn,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOrder(editingOrderId, editForm);
      setEditingOrderId(null);
      setEditForm({ name: "", drink: "", dineIn: false });
      fetchOrders();
    } catch (err) {
      setError("Failed to update order.");
    }
  };

  return (
    <div className="order-list-container">
      <h2 style={{ textAlign: "center" }}>All Orders</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              {editingOrderId === order._id && isAdmin ? ( // ✅ Only admin can edit
                <form onSubmit={handleEditSubmit} className="order-form">
                  <label>
                    Name:{" "}
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      required
                    />
                  </label>
                  <br />
                  <label>
                    Drink:{" "}
                    <input
                      type="text"
                      name="drink"
                      value={editForm.drink}
                      onChange={handleEditChange}
                      required
                    />
                  </label>
                  <br />
                  <label>
                    Dine In:{" "}
                    <input
                      type="checkbox"
                      name="dineIn"
                      checked={editForm.dineIn}
                      onChange={handleEditChange}
                    />
                  </label>
                  <br />
                  <button type="submit" className="button">
                    Save
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => setEditingOrderId(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="order-details">
                  <p>
                    <strong>Name:</strong> {order.name}
                  </p>
                  <p>
                    <strong>Drink:</strong> {order.drink}
                  </p>
                  <p>
                    <strong>Order Type:</strong> {order.dineIn ? "Dine In" : "Take Away"}
                  </p>
                  <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.orderDate).toLocaleString()}
                  </p>

                  {/* ✅ Only Admins Can Edit/Delete */}
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => startEdit(order)}
                        className="button"
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="button"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
