import db from "../db/connection.js";

const retrieveAllPlayers = async () => {
  const [rows] = await db.execute("SELECT * FROM players");
  return rows;
};

const retrieveSinglePlayer = async (id) => {
  const [rows] = await db.execute("SELECT * FROM players WHERE id = ?", [id]);
  const player = rows[0];
  return player;
};

const saveNewPlayer = async (player) => {
  const [result] = await db.execute(
    "INSERT INTO players (name, image_url) VALUES (?, ?)",
    [player.name, player.image_url]
  );

  const newPlayer = retrieveSinglePlayer(result.insertId);
  return newPlayer;
};

const increasePlayerPoints = (id, points) => {
  const players = retrieveAllPlayers();
  const playerIndex = players.findIndex((player) => player.id === id);
  players[playerIndex].points += points;
  fs.writeFileSync("./data/players.json", JSON.stringify(players));
  return players[playerIndex].points;
};

export {
  retrieveAllPlayers,
  retrieveSinglePlayer,
  saveNewPlayer,
  increasePlayerPoints,
};
