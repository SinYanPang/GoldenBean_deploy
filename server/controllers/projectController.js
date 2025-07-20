import Project from "../models/Project.js";

// Create a new project
const create = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all projects
const list = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single project
const read = (req, res) => {
  return res.json(req.project);
};

// Update a project by ID
const update = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.project._id,
      req.body,
      { new: true }
    );
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a single project
const remove = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.project._id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete all projects
const removeAll = async (req, res) => {
  try {
    await Project.deleteMany({});
    res.json({ message: "All projects deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Load project by ID
const projectByID = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    req.project = project;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve project" });
  }
};

export default {
  create,
  list,
  read,
  update,
  remove,
  removeAll,
  projectByID
};
