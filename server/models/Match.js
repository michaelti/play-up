import db from "../db/connection.js";

import { increasePlayerPoints } from "./Player.js";

const retrieveAllMatches = async () => {
  const [matches] = await db.execute(
    "SELECT * FROM matches ORDER BY created_at DESC"
  );

  // Get matches with their related data
  // This is not optimal, but is an approach that students might try

  for (const match of matches) {
    const [matchGame] = await db.execute("SELECT * FROM games WHERE id = ?", [
      match.game_id,
    ]);

    match.game = matchGame;

    match.players = [];

    const [matchPlayers] = await db.execute(
      "SELECT * FROM matches_players WHERE match_id = ?",
      [match.id]
    );

    for (const matchPlayer of matchPlayers) {
      const [playerRows] = await db.execute(
        "SELECT * FROM players WHERE id = ?",
        [matchPlayer.player_id]
      );

      const player = playerRows[0];

      match.players.push({
        ...player,
        isWinner: Boolean(matchPlayer.is_winner),
      });
    }
  }

  return matches;
};

const retrieveSingleMatch = async (id) => {
  const [rows] = await db.execute("SELECT * FROM matches WHERE id = ?", [id]);
  const match = rows[0];

  // Get related data
  // This is not optimal, but is an approach that students might try

  const [matchGame] = await db.execute("SELECT * FROM games WHERE id = ?", [
    match.game_id,
  ]);

  match.game = matchGame;

  match.players = [];

  const [matchPlayers] = await db.execute(
    "SELECT * FROM matches_players WHERE match_id = ?",
    [id]
  );

  for (const matchPlayer of matchPlayers) {
    const [playerRows] = await db.execute(
      "SELECT * FROM players WHERE id = ?",
      [matchPlayer.player_id]
    );

    const player = playerRows[0];

    match.players.push({
      ...player,
      isWinner: Boolean(matchPlayer.is_winner),
    });
  }

  return match;
};

const saveNewMatch = async (match) => {
  const [result] = await db.execute(
    "INSERT INTO matches (game_id) VALUES (?)",
    [match.game_id]
  );

  const newMatchId = result.insertId;

  for (const playerId of match.playerIds) {
    const isWinner = playerId === match.winnerPlayerId;
    const points = isWinner ? 100 : 50;

    await db.execute(
      "INSERT INTO matches_players (match_id, player_id, is_winner) VALUES (?, ?, ?)",
      [newMatchId, playerId, isWinner]
    );

    await increasePlayerPoints(playerId, points);
  }

  return await retrieveSingleMatch(newMatchId);
};

export { retrieveAllMatches, retrieveSingleMatch, saveNewMatch };
