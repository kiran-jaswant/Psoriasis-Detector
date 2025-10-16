import Consultation from "../models/Consultation.js";

// @desc   Create a new consultation
// @route  POST /api/consult
export const createConsultation = async (req, res) => {
  try {
    const consult = new Consultation(req.body);
    await consult.save();
    res.status(201).json({ message: "Form submitted successfully", consult });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// @desc   Get all consultations
// @route  GET /api/consult
export const getConsultations = async (req, res) => {
  try {
    const consults = await Consultation.find().sort({ createdAt: -1 });
    res.json(consults);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
