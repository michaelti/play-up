import express from "express";
import {
  getAllMatchResults,
  getSingleMatchResult,
  addNewMatchResult,
} from "../controllers/matchResultController.js";

const router = express.Router();

router.get("/", getAllMatchResults);
router.get("/:id", getSingleMatchResult);
router.post("/", addNewMatchResult);

export default router;
