import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(200).json({ message: "Successfully signed up!" });
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
  console.log("Incoming data:", req.body);
};

const list = async (req, res) => {
  try {
    const users = await User.find().select("name email role updated created");
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ error: "User not found" });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve user" });
  }
};

const read = (req, res) => {
  const { hashed_password, salt, ...safeProfile } = req.profile.toObject();
  res.json(safeProfile);
};

const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();

    const { hashed_password, salt, ...safeUser } = user.toObject();
    res.json(safeUser);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    const user = req.profile;
    const deletedUser = await user.deleteOne();
    const { hashed_password, salt, ...safeUser } = deletedUser.toObject();
    res.json(safeUser);
  } catch (err) {
    res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, userByID, read, list, remove, update };