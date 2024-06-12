import fs from "fs";
import crypto from "crypto";

const retrieveAllPlayers = () => {
  const playersJson = fs.readFileSync("./data/Players.json");
  return JSON.parse(playersJson);
};

const retrieveSinglePlayer = (id) => {
  const players = retrieveAllPlayers();
  return players.find((player) => player.id === id);
};

const saveNewPlayer = (player) => {
  const players = retrieveAllPlayers();
  players.push({ id: crypto.randomUUID(), ...player });
  fs.writeFileSync("./data/players.json", JSON.stringify(players));
  return player;
};

export { retrieveAllPlayers, retrieveSinglePlayer, saveNewPlayer };
