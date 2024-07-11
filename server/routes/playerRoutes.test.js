import { it, expect, describe, beforeEach } from "vitest";
import request from "supertest";
import app from "../index.js";
import db from "../db/connection.js";

beforeEach(async () => {
  await db.execute(`DELETE from players`);

  await db.execute(`
    INSERT INTO players (id, name, points, image_url) VALUES
      (1, 'Joe', 150, '/example.jpg'),
      (2, 'Sammy', 150, '/example.jpg'),
      (3, 'Michael', 0, '/example.jpg');
  `);
});

describe("GET /players", () => {
  it("Responds with a list of all players", async () => {
    const response = await request(app).get("/players");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "Joe",
        points: 150,
        image_url: "/example.jpg",
      },
      {
        id: 2,
        name: "Sammy",
        points: 150,
        image_url: "/example.jpg",
      },
      {
        id: 3,
        name: "Michael",
        points: 0,
        image_url: "/example.jpg",
      },
    ]);
  });
});

describe("GET /players/:id", () => {
  it("Responds with a single player", async () => {
    const response = await request(app).get("/players/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Joe",
      points: 150,
      image_url: "/example.jpg",
    });
  });
});

describe("POST /players", () => {
  it("Fails given an empty body", async () => {
    const body = {};

    const response = await request(app).post("/players").send(body);

    expect(response.status).toBe(400);
  });

  it("Responds with the new player", async () => {
    const body = {
      name: "New player",
    };

    const response = await request(app).post("/players").send(body);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(body);
    expect(response.body).toHaveProperty("id");
    expect(response.body.points).toBe(0);
    expect(response.body.image_url).toBe(null);
  });

  it("Creates the new player", async () => {
    const body = {
      name: "New player",
    };

    await request(app).post("/players").send(body);
    const [databaseRows] = await db.execute(
      "SELECT name, points, image_url FROM players"
    );

    const expectedResult = {
      name: body.name,
      points: 0,
      image_url: null,
    };

    expect(databaseRows).toContainEqual(expectedResult);
  });
});
