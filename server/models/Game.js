import db from "../db/connection.js";

const retrieveAllGames = async () => {
  const [rows] = await db.execute("SELECT * FROM games");
  return rows;
};

const retrieveSingleGame = async (id) => {
  const [rows] = await db.execute("SELECT * FROM games WHERE id = ?", [id]);
  const game = rows[0];
  return game;
};

const saveNewGame = async (game) => {
  const [result] = await db.execute(
    "INSERT INTO games (name, image_url) VALUES (?, ?)",
    [game.name, game.image_url]
  );

  const newGame = await retrieveSingleGame(result.insertId);
  return newGame;
};

export { retrieveAllGames, retrieveSingleGame, saveNewGame };
