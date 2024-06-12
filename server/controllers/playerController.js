import {
  retrieveAllPlayers,
  retrieveSinglePlayer,
  saveNewPlayer,
} from "../models/Player.js";

const getAllPlayers = (_req, res) => {
  try {
    const players = retrieveAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const getSinglePlayer = (req, res) => {
  const playerId = req.params.id;

  try {
    const player = retrieveSinglePlayer(playerId);
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const addNewPlayer = (req, res) => {
  const player = req.body;

  try {
    const newPlayer = saveNewPlayer(player);
    res.json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

export { getAllPlayers, getSinglePlayer, addNewPlayer };
