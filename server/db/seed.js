import db from "./connection.js";

await db.execute(`DELETE from matches_players`);
await db.execute(`DELETE from matches`);
await db.execute(`DELETE from players`);
await db.execute(`DELETE from games`);

await db.execute(`
    INSERT INTO games (id, name, image_url) VALUES
        (1, 'Super Smash Bros. Ultimate', '/images/8eb517e8-dcb2-4464-8e9d-9be6050abf6a.jpg'),
        (2, 'Switch Sports', '/images/e88a2a08-4f27-4bf2-82b9-d47f6ed65256.jpg'),
        (3, 'Trivial Pursuit Live!', '/images/086f4a81-71b1-43e1-950d-76c4d9c633cd.jpg'),
        (4, 'Mario Kart 8 Deluxe', '/images/ebefaeb6-9749-467e-89ea-bbe1d4829141.jpg'),
        (5, 'Rocket League', '/images/d56694c6-2e07-44d9-868b-1fd6bb1150da.jpg');
`);

await db.execute(`
    INSERT INTO players (id, name, points, image_url) VALUES
        (1, 'Joe', 150, '/images/876d9d75-c7a7-488c-ad52-665e1ff72c02.jpg'),
        (2, 'Sammy', 150, '/images/23a2111d-a516-4d3d-9173-9799a47ae336.jpg'),
        (3, 'Michael', 200, '/images/a43f1982-654b-4486-b110-50e3334042b1.jpg'),
        (4, 'Tom', 0, NULL),
        (5, 'Suzanne', 0, NULL),
        (6, 'Matt', 0, NULL),
        (7, 'Donkey Kong', 0, NULL);
`);

await db.execute(`
    INSERT INTO matches (id, game_id, created_at) VALUES
        (1, 1, '2023-01-01 00:00:00'),
        (2, 2, '2023-01-02 00:00:00'),
        (3, 2, '2023-01-03 00:00:00');
`);

await db.execute(`
    INSERT INTO matches_players (match_id, player_id, is_winner, points_given) VALUES
        (1, 1, true, 100),
        (1, 2, false, 50),
        (1, 3, false, 50),
        (2, 1, false, 50),
        (2, 3, true, 100),
        (3, 2, true, 100),
        (3, 3, false, 50);
`);

process.exit();
