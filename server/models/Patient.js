import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  age: Number,
  gender: String,
  bmi: Number,
  hereditary: String,
  stress: String,
  diet: String,
  exercise: String,
  smoking: String,
  drinking: String,
  severity: String, // mild / moderate / severe (from user)
  ai_recommendation: String, // OpenAI advice
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Patient", patientSchema);
