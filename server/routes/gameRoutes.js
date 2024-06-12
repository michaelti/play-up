import express from "express";
import { getAllGames, getSingleGame } from "../controllers/gameController.js";

const router = express.Router();

router.get("/", getAllGames);
router.get("/:id", getSingleGame);

export default router;
