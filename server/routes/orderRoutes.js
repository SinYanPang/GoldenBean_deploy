import express from "express";
import orderCtrl from "../controllers/orderController.js";

const router = express.Router();

// Create a new order or list all orders
router.route("/api/orders")
  .post(orderCtrl.create)
  .get(orderCtrl.list);

// Update, delete, or get a specific order by ID
router.route("/api/orders/:orderId")
  .get(orderCtrl.read)
  .put(orderCtrl.update)
  .delete(orderCtrl.remove);

export default router;
