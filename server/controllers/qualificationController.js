import Qualification from '../models/qualification.js';

// Create a new qualification
const create = async (req, res) => {
  try {
    const qualification = new Qualification(req.body);
    await qualification.save();
    res.status(201).json(qualification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all qualifications
const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single qualification
const read = (req, res) => {
  res.json(req.qualification);
};

// Update a qualification
const update = async (req, res) => {
  try {
    const updated = await Qualification.findByIdAndUpdate(
      req.qualification._id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a single qualification
const remove = async (req, res) => {
  try {
    await Qualification.findByIdAndDelete(req.qualification._id);
    res.json({ message: 'Qualification deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete all qualifications
const removeAll = async (req, res) => {
  try {
    await Qualification.deleteMany({});
    res.json({ message: 'All qualifications deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Middleware to find qualification by ID
const qualificationByID = async (req, res, next, id) => {
  try {
    const qualification = await Qualification.findById(id);
    if (!qualification) {
      return res.status(404).json({ error: 'Qualification not found' });
    }
    req.qualification = qualification;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve qualification' });
  }
};

export default {
  create,
  list,
  read,
  update,
  remove,
  removeAll, // ✅ export delete-all
  qualificationByID
};
