import express from "express";
import { createConsultation, getConsultations } from "../controllers/consultController.js";

const router = express.Router();

// Create a new consultation
router.post("/", createConsultation);

// Get all consultations
router.get("/", getConsultations);

export default router;
