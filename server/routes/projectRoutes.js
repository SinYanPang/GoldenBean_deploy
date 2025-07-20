import express from "express";
import Project from "../models/project.js";
import authCtrl from "../controllers/auth.controller.js"; // For requireSignin
import requireAdmin from "../controllers/requireAdmin.js"; // Admin middleware

const router = express.Router();

// CREATE (Admin only)
router.post("/api/projects", authCtrl.requireSignin, requireAdmin, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: "Failed to add project" });
  }
});

// READ (Public)
router.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// UPDATE (Admin only)
router.put("/api/projects/:id", authCtrl.requireSignin, requireAdmin, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update project" });
  }
});

// DELETE (Admin only)
router.delete("/api/projects/:id", authCtrl.requireSignin, requireAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;