import { retrieveAllGames, retrieveSingleGame } from "../models/Game.js";

const getAllGames = (_req, res) => {
  try {
    const games = retrieveAllGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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

export { getAllGames, getSingleGame };
