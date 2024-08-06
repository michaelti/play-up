import db from "../db/connection.js";

const retrieveAllGames = async () => {
  const res = await db.query("SELECT * FROM games");
  return res.rows;
};

const retrieveSingleGame = async (id) => {
  const res = await db.query("SELECT * FROM games WHERE id = $1", [id]);
  const game = res.rows[0];
  return game;
};

const saveNewGame = async (game) => {
  const res = await db.query(
    "INSERT INTO games (name, image_url) VALUES ($1, $2) RETURNING *",
    [game.name, game.image_url]
  );

  return res.rows[0];
};

export { retrieveAllGames, retrieveSingleGame, saveNewGame };
