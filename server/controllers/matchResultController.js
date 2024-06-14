import {
  retrieveAllMatchResults,
  retrieveSingleMatchResult,
  saveNewMatchResult,
} from "../models/MatchResult.js";

const getAllMatchResults = (_req, res) => {
  try {
    const matchResults = retrieveAllMatchResults();
    res.json(matchResults);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const getSingleMatchResult = (req, res) => {
  const matchResultId = req.params.id;

  try {
    const matchResult = retrieveSingleMatchResult(matchResultId);
    res.json(matchResult);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

const addNewMatchResult = (req, res) => {
  const matchResult = req.body;

  try {
    const newMatchResult = saveNewMatchResult(matchResult);
    res.status(201).json(newMatchResult);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

export { getAllMatchResults, getSingleMatchResult, addNewMatchResult };
