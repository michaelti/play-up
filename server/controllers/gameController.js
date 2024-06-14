import crypto from "crypto";
import {
  retrieveAllGames,
  retrieveSingleGame,
  saveNewGame,
} from "../models/Game.js";

const getAllGames = (_req, res) => {
  try {
    const games = retrieveAllGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const getSingleGame = (req, res) => {
  const gameId = req.params.id;

  try {
    const game = retrieveSingleGame(gameId);
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const addNewGame = (req, res) => {
  const game = req.body;

  try {
    const newGame = saveNewGame(game);
    res.json(newGame);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

export { getAllGames, getSingleGame, addNewGame };
