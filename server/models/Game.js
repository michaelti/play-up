import fs from "fs";

const retrieveAllGames = () => {
  const gamesJson = fs.readFileSync("./data/games.json");
  return JSON.parse(gamesJson);
};

const retrieveSingleGame = (id) => {
  const games = retrieveAllGames();
  return games.find((game) => game.id === id);
};

export { retrieveAllGames, retrieveSingleGame };
