import fs from "fs";
import crypto from "crypto";

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
  console.log(matchResults);
  fs.writeFileSync("./data/match-results.json", JSON.stringify(matchResults));
  return matchResult;
};

export {
  retrieveAllMatchResults,
  retrieveSingleMatchResult,
  saveNewMatchResult,
};
