import db from "./connection.js";

await db.execute("DROP TABLE IF EXISTS matches_players;");
await db.execute("DROP TABLE IF EXISTS matches;");
await db.execute("DROP TABLE IF EXISTS players;");
await db.execute("DROP TABLE IF EXISTS games;");

await db.execute(`
    CREATE TABLE games (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image_url VARCHAR(255)
    );
`);

await db.execute(`
    CREATE TABLE players (
        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name varchar(255) NOT NULL,
        points int NOT NULL DEFAULT 0,
        image_url varchar(255)
    );
`);

await db.execute(`
    CREATE TABLE matches (
        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        game_id int NOT NULL,
        FOREIGN KEY (game_id) REFERENCES games(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`);

await db.execute(`
    CREATE TABLE matches_players (
        match_id int NOT NULL,
        FOREIGN KEY (match_id) REFERENCES matches(id),
        player_id int NOT NULL,
        FOREIGN KEY (player_id) REFERENCES players(id),
        is_winner bool NOT NULL DEFAULT 0
    );
`);

process.exit();
