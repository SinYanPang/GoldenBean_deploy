import React, { useState } from "react";
import { createOrder } from "../lib/api-order.js";
import "./Order.css";

console.log("Rendering Order page");

export default function Order() {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("Americano");
  const [orderType, setOrderType] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleDropdownChange = (e) => setSelectedOption(e.target.value);
  const handleOrderTypeChange = (e) => setOrderType(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue || !selectedOption || !orderType) {
      setError("Please complete all fields before submitting.");
      return;
    }

    const orderData = {
      name: inputValue,
      drink: selectedOption,
      dineIn: orderType === "Dine in",
    };

    try {
      const result = await createOrder(orderData);
      console.log("Order submitted:", result);
      alert("Order submitted successfully.");
      handleRestart();
      setError("");
    } catch (err) {
      setError(err.message || "Failed to submit order.");
    }
  };

  const handleRestart = () => {
    setInputValue("");
    setSelectedOption("Americano");
    setOrderType("");
    setError("");
  };

  return (
    <div className="order-container">
      <form onSubmit={handleSubmit}>
        <label>
          Your Name:
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>

        <label>
          Select a drink:
          <select value={selectedOption} onChange={handleDropdownChange}>
            <option value="Americano">Americano</option>
            <option value="Latte">Latte</option>
            <option value="Cappuccino">Cappuccino</option>
          </select>
        </label>

        <label>
          Order Type:
          <select value={orderType} onChange={handleOrderTypeChange}>
            <option value="">-- Select --</option>
            <option value="Dine in">Dine in</option>
            <option value="Take away">Take away</option>
          </select>
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit">Submit Order</button>
        <button type="button" onClick={handleRestart} style={{ marginLeft: "10px" }}>
          Restart
        </button>
      </form>
    </div>
  );
}
