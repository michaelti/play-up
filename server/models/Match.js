import db from "../db/connection.js";

import { increasePlayerPoints } from "./Player.js";

const retrieveAllMatches = async () => {
  const [matches] = await db.execute("SELECT * FROM matches");

  // Get matches with their related player data
  // This is not optimal, but is an approach that students might try

  for (const match of matches) {
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
  return match;
};

const saveNewMatch = (matchResult) => {
  const matchResults = retrieveAllMatchResults();
  matchResults.push({
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    ...matchResult,
  });

  const pointsForParticipation = 50;
  const pointsForWin = 50;

  for (const playerId of matchResult.playerIds) {
    increasePlayerPoints(playerId, pointsForParticipation);
  }

  increasePlayerPoints(matchResult.winnerPlayerId, pointsForWin);

  fs.writeFileSync("./data/match-results.json", JSON.stringify(matchResults));
  return matchResult;
};

export { retrieveAllMatches, retrieveSingleMatch, saveNewMatch };
