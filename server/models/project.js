// models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  firstname: String,
  lastname: String,
  email: String,
  completion: Date,
  description: String
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
