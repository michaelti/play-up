import fs from "fs";
import crypto from "crypto";

const retrieveAllGames = () => {
  const gamesJson = fs.readFileSync("./data/games.json");
  return JSON.parse(gamesJson);
};

const retrieveSingleGame = (id) => {
  const games = retrieveAllGames();
  return games.find((game) => game.id === id);
};

const saveNewGame = (game) => {
  const games = retrieveAllGames();
  games.push({ id: crypto.randomBytes(16).toString("hex"), ...game });
  fs.writeFileSync("./data/games.json", JSON.stringify(games));
  return game;
};

export { retrieveAllGames, retrieveSingleGame, saveNewGame };
