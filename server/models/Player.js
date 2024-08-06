import db from "../db/connection.js";

const retrieveAllPlayers = async () => {
  const players = await db.query("SELECT * FROM players");
  return players.rows;
};

const retrieveSinglePlayer = async (id) => {
  const players = await db.query("SELECT * FROM players WHERE id = $1", [id]);
  const player = players.rows[0];
  return player;
};

const saveNewPlayer = async (player) => {
  const result = await db.query(
    "INSERT INTO players (name, image_url) VALUES ($1, $2) RETURNING id",
    [player.name, player.image_url]
  );

  const newPlayer = await retrieveSinglePlayer(result.rows[0].id);
  return newPlayer;
};

const increasePlayerPoints = async (id, points) => {
  await db.query("UPDATE players SET points = points + $1 WHERE id = $2", [
    points,
    id,
  ]);

  const updatedPlayer = await retrieveSinglePlayer(id);
  return updatedPlayer;
};

export {
  retrieveAllPlayers,
  retrieveSinglePlayer,
  saveNewPlayer,
  increasePlayerPoints,
};
