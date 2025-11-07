import { Router } from "express";
import { recommendLifestyle } from "../controllers/recommendationController.js";

const router = Router();

// Final URL: POST /api/consultation/recommend
router.post("/consultation/recommend", recommendLifestyle);

export default router;   // ✅ must be default export for ES modules
