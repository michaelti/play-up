import {
  retrieveAllMatches,
  retrieveSingleMatch,
  saveNewMatch,
} from "../models/Match.js";

const getAllMatches = async (_req, res) => {
  try {
    const matches = await retrieveAllMatches();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const getSingleMatch = async (req, res) => {
  const matchId = req.params.id;

  try {
    const match = await retrieveSingleMatch(matchId);
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const addNewMatch = async (req, res) => {
  const match = req.body;

  if (!match.game_id || !match.playerIds || !match.winnerPlayerId) {
    return res
      .status(400)
      .json({ error: `Please include all required fields.` });
  }

  if (!match.playerIds.includes(match.winnerPlayerId)) {
    return res
      .status(400)
      .json({ error: `winnerPlayerId must exist in playerIds` });
  }

  try {
    const newMatch = await saveNewMatch(match);
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

export { getAllMatches, getSingleMatch, addNewMatch };
