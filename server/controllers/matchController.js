import {
  retrieveAllMatches,
  retrieveSingleMatch,
  saveNewMatch,
} from "../models/Match.js";

const getAllMatches = async (_req, res) => {
  try {
    const matchResults = await retrieveAllMatches();
    res.json(matchResults);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const getSingleMatch = async (req, res) => {
  const matchResultId = req.params.id;

  try {
    const matchResult = await retrieveSingleMatch(matchResultId);
    res.json(matchResult);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const addNewMatch = (req, res) => {
  const matchResult = req.body;

  try {
    const newMatchResult = saveNewMatch(matchResult);
    res.status(201).json(newMatchResult);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

export { getAllMatches, getSingleMatch, addNewMatch };
