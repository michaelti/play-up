import { it, expect, describe, beforeEach, afterEach } from "vitest";
import request from "supertest";
import app from "../index.js";
import db from "../db/connection.js";

const cleanupMatches = async () => {
  await db.query(`DELETE from matches_players`);
  await db.query(`DELETE from matches`);
};

beforeEach(async () => {
  await cleanupMatches();
  await db.query(`DELETE from players`);
  await db.query(`DELETE from games`);

  await db.query(`
    INSERT INTO players (id, name, points, image_url) VALUES
      (1, 'Joe', 150, '/example.jpg'),
      (2, 'Sammy', 150, '/example.jpg'),
      (3, 'Michael', 0, '/example.jpg');
  `);

  await db.query(`
    INSERT INTO games (id, name, image_url) VALUES
        (1, 'Game 1', '/example.jpg'),
        (2, 'Game 2', '/example.jpg'),
        (3, 'Game 3', '/example.jpg');
  `);

  await db.query(`
    INSERT INTO matches (id, game_id, created_at) VALUES 
        (1, 1, '2023-01-01 00:00:00');
  `);

  await db.query(`
    INSERT INTO matches_players (match_id, player_id, is_winner, points_given) VALUES 
        (1, 1, true, 100), 
        (1, 2, false, 50);
  `);
});

afterEach(async () => {
  await cleanupMatches();
});

describe("GET /matches", () => {
  it("Responds with a list of all matches", async () => {
    const response = await request(app).get("/matches");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        game_id: 1,
        created_at: "2023-01-01T00:00:00.000Z",
        game: { id: 1, name: "Game 1", image_url: "/example.jpg" },
        players: [
          {
            id: 1,
            name: "Joe",
            points: 150,
            image_url: "/example.jpg",
            isWinner: true,
            pointsGiven: 100,
          },
          {
            id: 2,
            name: "Sammy",
            points: 150,
            image_url: "/example.jpg",
            isWinner: false,
            pointsGiven: 50,
          },
        ],
      },
    ]);
  });
});

describe("GET /matches/:id", () => {
  it("Responds with a single match", async () => {
    const response = await request(app).get("/matches/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      game_id: 1,
      created_at: "2023-01-01T00:00:00.000Z",
      game: { id: 1, name: "Game 1", image_url: "/example.jpg" },
      players: [
        {
          id: 1,
          name: "Joe",
          points: 150,
          image_url: "/example.jpg",
          isWinner: true,
          pointsGiven: 100,
        },
        {
          id: 2,
          name: "Sammy",
          points: 150,
          image_url: "/example.jpg",
          isWinner: false,
          pointsGiven: 50,
        },
      ],
    });
  });
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

    await cleanupMatches();
    await request(app).post("/matches").send(body);
    const matches = await db.query("SELECT game_id FROM matches");

    const expectedResult = {
      game_id: body.game_id,
    };

    expect(matches.rows).toContainEqual(expectedResult);
  });

  it("Creates the related matches_players", async () => {
    const body = {
      game_id: 1,
      playerIds: [1, 2],
      winnerPlayerId: 1,
    };

    await cleanupMatches();
    const response = await request(app).post("/matches").send(body);
    const id = response.body.id;

    const matchesPlayers = await db.query(
      "SELECT * FROM matches_players WHERE match_id = $1",
      [id]
    );

    expect(matchesPlayers.rows).toHaveLength(2);
  });

  it("Assigns a winner", async () => {
    const body = {
      game_id: 1,
      playerIds: [1, 2],
      winnerPlayerId: 1,
    };

    await cleanupMatches();
    await request(app).post("/matches").send(body);

    const matchesPlayers = await db.query(
      "SELECT is_winner FROM matches_players WHERE player_id = $1",
      [body.winnerPlayerId]
    );

    expect(matchesPlayers.rows[0].is_winner).toBeTruthy();
  });

  it("Assigns 50 points to players", async () => {
    const body = {
      game_id: 1,
      playerIds: [1, 2],
      winnerPlayerId: 1,
    };

    await cleanupMatches();
    await request(app).post("/matches").send(body);

    const matchesPlayers = await db.query(
      "SELECT points_given FROM matches_players WHERE player_id = $1",
      [body.playerIds[1]]
    );

    const players = await db.query("SELECT points FROM players WHERE id = $1", [
      body.playerIds[1],
    ]);

    expect(matchesPlayers.rows[0].points_given).toBe(50);
    expect(players.rows[0].points).toBe(200); // seed amount plus 50
  });

  it("Assigns 100 points to winner", async () => {
    const body = {
      game_id: 1,
      playerIds: [1, 2],
      winnerPlayerId: 1,
    };

    await cleanupMatches();
    await request(app).post("/matches").send(body);

    const matchesPlayers = await db.query(
      "SELECT points_given FROM matches_players WHERE player_id = $1",
      [body.winnerPlayerId]
    );

    const players = await db.query("SELECT points FROM players WHERE id = $1", [
      body.winnerPlayerId,
    ]);

    expect(matchesPlayers.rows[0].points_given).toBe(100);
    expect(players.rows[0].points).toBe(250); // seed amount plus 100
  });
});
