import mongoose from "mongoose";

const consultSchema = new mongoose.Schema({
  age: Number,
  gender: String,
  bmi: Number,
  smoking: String,
  alcohol: String,
  stressLevel: String,
  dietType: String,
  exerciseFrequency: String,
  comorbidities: String,
  reportedSymptoms: String,
}, { timestamps: true });

const Consultation = mongoose.model("Consultation", consultSchema);

export default Consultation;   
