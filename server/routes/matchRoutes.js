import express from "express";
import {
  getAllMatches,
  getSingleMatch,
  addNewMatch,
} from "../controllers/matchController.js";

const router = express.Router();

router.get("/", getAllMatches);
router.get("/:id", getSingleMatch);
router.post("/", addNewMatch);

export default router;
