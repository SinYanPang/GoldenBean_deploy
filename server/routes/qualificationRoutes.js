import express from "express";
import Qualification from "../models/qualification.js";
import authCtrl from "../controllers/auth.controller.js"; // For requireSignin
import requireAdmin from "../controllers/requireAdmin.js"; // Admin-only middleware

const router = express.Router();

// CREATE (Admin only)
router.post(
  "/api/qualifications",
  authCtrl.requireSignin,
  requireAdmin,
  async (req, res) => {
    console.log("POST received:", req.body);
    try {
      const newQualification = new Qualification(req.body);
      await newQualification.save();
      res.status(201).json(newQualification);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Failed to add qualification" });
    }
  }
);

// READ (Public)
router.get("/api/qualifications", async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch qualifications" });
  }
});

// UPDATE (Admin only)
router.put(
  "/api/qualifications/:id",
  authCtrl.requireSignin,
  requireAdmin,
  async (req, res) => {
    try {
      const updatedQualification = await Qualification.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedQualification) {
        return res.status(404).json({ error: "Qualification not found" });
      }
      res.json(updatedQualification);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Failed to update qualification" });
    }
  }
);

// DELETE (Admin only)
router.delete(
  "/api/qualifications/:id",
  authCtrl.requireSignin,
  requireAdmin,
  async (req, res) => {
    try {
      const deleted = await Qualification.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Qualification not found" });
      }
      res.json({ message: "Qualification deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Failed to delete qualification" });
    }
  }
);

export default router;