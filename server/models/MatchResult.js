import fs from "fs";
import crypto from "crypto";
import { increasePlayerPoints } from "./Player.js";

const retrieveAllMatchResults = () => {
  const matchResultsJson = fs.readFileSync("./data/match-results.json");
  return JSON.parse(matchResultsJson);
};

const retrieveSingleMatchResult = (id) => {
  const matchResults = retrieveAllMatchResults();
  return matchResults.find((matchResult) => matchResult.id === id);
};

const saveNewMatchResult = (matchResult) => {
  const matchResults = retrieveAllMatchResults();
  matchResults.push({
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    ...matchResult,
  });

  const pointsForParticipation = 50;
  const pointsForWin = 50;

  for (const playerId of matchResult.playerIds) {
    increasePlayerPoints(playerId, pointsForParticipation);
  }

  increasePlayerPoints(matchResult.winnerPlayerId, pointsForWin);

  fs.writeFileSync("./data/match-results.json", JSON.stringify(matchResults));
  return matchResult;
};

export {
  retrieveAllMatchResults,
  retrieveSingleMatchResult,
  saveNewMatchResult,
};
