import mongoose from "mongoose";

const QualificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  completion: { type: Date, required: true },
  description: { type: String, required: true }
}, {
  timestamps: true,
});

const Qualification = mongoose.model("Qualification", QualificationSchema);
export default Qualification;