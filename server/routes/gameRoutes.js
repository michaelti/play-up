import express from "express";
import {
  getAllGames,
  getSingleGame,
  addNewGame,
} from "../controllers/gameController.js";

const router = express.Router();

router.get("/", getAllGames);
router.get("/:id", getSingleGame);
router.post("/", addNewGame);

export default router;
