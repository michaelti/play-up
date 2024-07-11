import { it, expect, describe, beforeEach } from "vitest";
import request from "supertest";
import app from "../index.js";
import db from "../db/connection.js";

beforeEach(async () => {
  await db.execute(`DELETE from matches_players`);
  await db.execute(`DELETE from matches`);
  await db.execute(`DELETE from players`);
  await db.execute(`DELETE from games`);

  await db.execute(`
    INSERT INTO players (id, name, points, image_url) VALUES
      (1, 'Joe', 150, '/example.jpg'),
      (2, 'Sammy', 150, '/example.jpg'),
      (3, 'Michael', 0, '/example.jpg');
  `);

  await db.execute(`
    INSERT INTO games (id, name, image_url) VALUES
        (1, 'Game 1', '/example.jpg'),
        (2, 'Game 2', '/example.jpg'),
        (3, 'Game 3', '/example.jpg');
  `);
});

describe("POST /matches", () => {
  it("Fails given an empty body", async () => {
    const body = {};

    const response = await request(app).post("/matches").send(body);

    expect(response.status).toBe(400);
  });

  it("Responds with the new match", async () => {
    const body = {
      game_id: 1,
      playerIds: [1, 2],
      winnerPlayerId: 1,
    };

    const response = await request(app).post("/matches").send(body);
    console.log(response.body.game_id);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body.game_id).toBe(body.game_id);
    expect(response.body.game.id).toBe(body.game_id);
    expect(response.body.players.map((player) => player.id)).toMatchObject(
      body.playerIds
    );
  });

  it("Creates the new match", async () => {
    const body = {
      game_id: 1,
      playerIds: [1, 2],
      winnerPlayerId: 1,
    };

    await request(app).post("/matches").send(body);
    const [databaseRows] = await db.execute("SELECT game_id FROM matches");

    const expectedResult = {
      game_id: body.game_id,
    };

    expect(databaseRows).toContainEqual(expectedResult);
  });

  it("Creates the related matches_players", async () => {
    const body = {
      game_id: 1,
      playerIds: [1, 2],
      winnerPlayerId: 1,
    };

    const response = await request(app).post("/matches").send(body);
    const id = response.body.id;

    const [databaseRows] = await db.execute(
      "SELECT * FROM matches_players WHERE match_id = ?",
      [id]
    );

    expect(databaseRows).toHaveLength(2);
  });

  it("Assigns a winner", async () => {
    const body = {
      game_id: 1,
      playerIds: [1, 2],
      winnerPlayerId: 1,
    };

    await request(app).post("/matches").send(body);

    const [[record]] = await db.execute(
      "SELECT is_winner FROM matches_players WHERE player_id = ?",
      [body.winnerPlayerId]
    );

    expect(record.is_winner).toBeTruthy();
  });

  it("Assigns 50 points to players", async () => {
    const body = {
      game_id: 1,
      playerIds: [1, 2],
      winnerPlayerId: 1,
    };

    await request(app).post("/matches").send(body);

    const [[matchesPlayersRecord]] = await db.execute(
      "SELECT points_given FROM matches_players WHERE player_id = ?",
      [body.playerIds[1]]
    );

    const [[playersRecord]] = await db.execute(
      "SELECT points FROM players WHERE id = ?",
      [body.playerIds[1]]
    );

    expect(matchesPlayersRecord.points_given).toBe(50);
    expect(playersRecord.points).toBe(200); // seed amount plus 50
  });

  it("Assigns 100 points to winner", async () => {
    const body = {
      game_id: 1,
      playerIds: [1, 2],
      winnerPlayerId: 1,
    };

    await request(app).post("/matches").send(body);

    const [[matchesPlayersRecord]] = await db.execute(
      "SELECT points_given FROM matches_players WHERE player_id = ?",
      [body.winnerPlayerId]
    );

    const [[playersRecord]] = await db.execute(
      "SELECT points FROM players WHERE id = ?",
      [body.winnerPlayerId]
    );

    expect(matchesPlayersRecord.points_given).toBe(100);
    expect(playersRecord.points).toBe(250); // seed amount plus 100
  });
});
