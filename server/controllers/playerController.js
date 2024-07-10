import {
  retrieveAllPlayers,
  retrieveSinglePlayer,
  saveNewPlayer,
} from "../models/Player.js";

const getAllPlayers = async (_req, res) => {
  try {
    const players = await retrieveAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const getSinglePlayer = async (req, res) => {
  const playerId = req.params.id;

  try {
    const player = await retrieveSinglePlayer(playerId);

    if (!player) {
      return res
        .status(404)
        .json({ error: `Could not find player with id ${playerId}` });
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const addNewPlayer = async (req, res) => {
  const { name, points, image_url } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Required field: name" });
  }

  const player = {
    name,
    points: points ?? null,
    image_url: image_url ?? null,
  };

  try {
    const newPlayer = await saveNewPlayer(player);
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

export { getAllPlayers, getSinglePlayer, addNewPlayer };
