import db from "./connection.js";

await db.query("DROP TABLE IF EXISTS matches_players;");
await db.query("DROP TABLE IF EXISTS matches;");
await db.query("DROP TABLE IF EXISTS players;");
await db.query("DROP TABLE IF EXISTS games;");

await db.query(`
    CREATE TABLE games (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image_url VARCHAR(255)
    );
`);

await db.query(`
    CREATE TABLE players (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        points INT NOT NULL DEFAULT 0,
        image_url VARCHAR(255)
    );
`);

await db.query(`
    CREATE TABLE matches (
        id SERIAL PRIMARY KEY,
        game_id INT NOT NULL,
        FOREIGN KEY (game_id) REFERENCES games(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`);

await db.query(`
    CREATE TABLE matches_players (
        match_id INT NOT NULL,
        FOREIGN KEY (match_id) REFERENCES matches(id),
        player_id INT NOT NULL,
        FOREIGN KEY (player_id) REFERENCES players(id),
        is_winner BOOLEAN NOT NULL DEFAULT FALSE,
        points_given INT NOT NULL DEFAULT 0
    );
`);

process.exit();