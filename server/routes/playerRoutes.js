import express from "express";
import {
  getAllPlayers,
  getSinglePlayer,
  addNewPlayer,
} from "../controllers/playerController.js";

const router = express.Router();

router.get("/", getAllPlayers);
router.get("/:id", getSinglePlayer);
router.post("/", addNewPlayer);

export default router;
