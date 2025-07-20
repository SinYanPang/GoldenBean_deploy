import Contact from "../models/contact.js";

// Create a new contact
const create = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all contacts
const list = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single contact by ID
const read = async (req, res) => {
  res.json(req.contact);
};

// Update contact by ID
const update = async (req, res) => {
  try {
    let contact = req.contact;
    Object.assign(contact, req.body);
    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete contact by ID
const remove = async (req, res) => {
  try {
    await req.contact.deleteOne();
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete all contacts
const removeAll = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.status(200).json({ message: "All contacts deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Middleware to load contact by ID for routes with :contactId param
const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    req.contact = contact;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid contact ID" });
  }
};

export default { create, list, read, update, remove, removeAll, contactByID };

