import { it, expect, describe, beforeEach } from "vitest";
import request from "supertest";
import app from "../index.js";
import db from "../db/connection.js";

beforeEach(async () => {
  await db.execute(`DELETE from games`);

  await db.execute(`
    INSERT INTO games (id, name, image_url) VALUES
        (1, 'Game 1', '/example.jpg'),
        (2, 'Game 2', '/example.jpg'),
        (3, 'Game 3', '/example.jpg');
  `);
});

describe("GET /games", () => {
  it("Responds with a list of all games", async () => {
    const response = await request(app).get("/games");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "Game 1",
        image_url: "/example.jpg",
      },
      {
        id: 2,
        name: "Game 2",
        image_url: "/example.jpg",
      },
      {
        id: 3,
        name: "Game 3",
        image_url: "/example.jpg",
      },
    ]);
  });
});

describe("GET /games/:id", () => {
  it("Responds with a single game", async () => {
    const response = await request(app).get("/games/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Game 1",
      image_url: "/example.jpg",
    });
  });
});

describe("POST /games", () => {
  it("Fails given an invalid body", async () => {
    const body = {};

    const response = await request(app).post("/games").send(body);

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  it("Responds with the new game", async () => {
    const body = {
      name: "New game",
      image_url: "/example.png",
    };

    const response = await request(app).post("/games").send(body);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(body);
    expect(response.body).toHaveProperty("id");
  });

  it("Creates the new game", async () => {
    const body = {
      name: "New game",
      image_url: "/example.png",
    };

    await request(app).post("/games").send(body);
    const [databaseRows] = await db.execute(
      "SELECT name, image_url FROM games"
    );

    expect(databaseRows).toContainEqual(body);
  });
});
