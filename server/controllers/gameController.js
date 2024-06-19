import {
  retrieveAllGames,
  retrieveSingleGame,
  saveNewGame,
} from "../models/Game.js";

const getAllGames = async (_req, res) => {
  try {
    const games = await retrieveAllGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const getSingleGame = async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await retrieveSingleGame(gameId);
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const addNewGame = async (req, res) => {
  const game = req.body;

  try {
    const newGame = await saveNewGame(game);
    res.json(newGame);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

export { getAllGames, getSingleGame, addNewGame };
