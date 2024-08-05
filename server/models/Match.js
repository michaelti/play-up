import db from "../db/connection.js";
import { increasePlayerPoints } from "./Player.js";

const retrieveAllMatches = async () => {
  const matches = await db.query(
    "SELECT * FROM matches ORDER BY created_at DESC"
  );

  // Get matches with their related data
  // This is not optimal, but is an approach that students might try

  for (const match of matches.rows) {
    const game = await db.query("SELECT * FROM games WHERE id = $1", [
      match.game_id,
    ]);

    match.game = game.rows[0];

    match.players = [];

    const matchPlayers = await db.query(
      "SELECT * FROM matches_players WHERE match_id = $1",
      [match.id]
    );

    for (const matchPlayer of matchPlayers.rows) {
      const players = await db.query("SELECT * FROM players WHERE id = $1", [
        matchPlayer.player_id,
      ]);

      const player = players.rows[0];

      match.players.push({
        ...player,
        isWinner: Boolean(matchPlayer.is_winner),
        pointsGiven: matchPlayer.points_given,
      });
    }
  }

  return matches.rows;
};

const retrieveSingleMatch = async (id) => {
  const matches = await db.query("SELECT * FROM matches WHERE id = $1", [id]);
  const match = matches.rows[0];

  const matchGames = await db.query("SELECT * FROM games WHERE id = $1", [
    match.game_id,
  ]);

  match.game = matchGames.rows[0];
  match.players = [];

  const matchPlayers = await db.query(
    "SELECT * FROM matches_players WHERE match_id = $1",
    [id]
  );

  for (const matchPlayer of matchPlayers.rows) {
    const players = await db.query("SELECT * FROM players WHERE id = $1", [
      matchPlayer.player_id,
    ]);

    const player = players.rows[0];

    match.players.push({
      ...player,
      isWinner: Boolean(matchPlayer.is_winner),
      pointsGiven: matchPlayer.points_given,
    });
  }

  return match;
};

const saveNewMatch = async (match) => {
  const result = await db.query("INSERT INTO matches (game_id) VALUES ($1) RETURNING id", [
    match.game_id,
  ]);

  const newMatchId = result.rows[0].id;

  for (const playerId of match.playerIds) {
    const isWinner = playerId === match.winnerPlayerId;
    const points = isWinner ? 100 : 50;

    await db.query(
      "INSERT INTO matches_players (match_id, player_id, is_winner, points_given) VALUES ($1, $2, $3, $4)",
      [newMatchId, playerId, isWinner, points]
    );

    await increasePlayerPoints(playerId, points);
  }

  return await retrieveSingleMatch(newMatchId);
};

export { retrieveAllMatches, retrieveSingleMatch, saveNewMatch };
