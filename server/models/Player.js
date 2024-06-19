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

const increasePlayerPoints = async (id, points) => {
  await db.execute("UPDATE players SET points = points + ? WHERE id = ?", [
    points,
    id,
  ]);

  const updatedPlayer = retrieveSinglePlayer(id);

  return updatedPlayer;
};

export {
  retrieveAllPlayers,
  retrieveSinglePlayer,
  saveNewPlayer,
  increasePlayerPoints,
};
