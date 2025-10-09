# Database Schema

## Supabase Project

**Project URL:** Stored in `.env` as `VITE_SUPABASE_URL`
**Anon Key:** Found in Supabase Dashboard → Project Settings → API (stored in `.env`)

---

## Schema Creation

Run in Supabase SQL Editor to create/reset tables:

```sql
DROP TABLE IF EXISTS matches_players CASCADE;
DROP TABLE IF EXISTS matches CASCADE;
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS games CASCADE;

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255)
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    points INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255)
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    game_id INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES games(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matches_players (
    match_id INT NOT NULL,
    FOREIGN KEY (match_id) REFERENCES matches(id),
    player_id INT NOT NULL,
    FOREIGN KEY (player_id) REFERENCES players(id),
    is_winner BOOLEAN NOT NULL DEFAULT FALSE,
    points_given INT NOT NULL DEFAULT 0
);
```

---

## Seed Data

Optional seed data for development/testing:

```sql
INSERT INTO games (name, image_url) VALUES
    ('Super Smash Bros. Ultimate', '/images/8eb517e8-dcb2-4464-8e9d-9be6050abf6a.jpg'),
    ('Switch Sports', '/images/e88a2a08-4f27-4bf2-82b9-d47f6ed65256.jpg'),
    ('Trivial Pursuit Live!', '/images/086f4a81-71b1-43e1-950d-76c4d9c633cd.jpg'),
    ('Mario Kart 8 Deluxe', '/images/ebefaeb6-9749-467e-89ea-bbe1d4829141.jpg'),
    ('Rocket League', '/images/d56694c6-2e07-44d9-868b-1fd6bb1150da.jpg');

INSERT INTO players (name, points, image_url) VALUES
    ('Joe', 150, '/images/876d9d75-c7a7-488c-ad52-665e1ff72c02.jpg'),
    ('Sammy', 150, '/images/23a2111d-a516-4d3d-9173-9799a47ae336.jpg'),
    ('Michael', 200, '/images/a43f1982-654b-4486-b110-50e3334042b1.jpg'),
    ('Tom', 0, NULL),
    ('Suzanne', 0, NULL),
    ('Matt', 0, NULL),
    ('Donkey Kong', 0, NULL);

INSERT INTO matches (game_id, created_at) VALUES
    (1, '2023-01-01 00:00:00'),
    (2, '2023-01-02 00:00:00'),
    (2, '2023-01-03 00:00:00');

INSERT INTO matches_players (match_id, player_id, is_winner, points_given) VALUES
    (1, 1, true, 100),
    (1, 2, false, 50),
    (1, 3, false, 50),
    (2, 1, false, 50),
    (2, 3, true, 100),
    (3, 2, true, 100),
    (3, 3, false, 50);
```

---

## Future Optimizations

### 1. PostgreSQL Function for Match Creation

**Current Implementation:**

Match creation is handled client-side in `client/src/lib/createMatch.js` with multiple sequential queries:
1. Insert into `matches` table
2. Insert into `matches_players` junction table
3. Update each player's points (one query per player)

**Problem:**
- Multiple round-trips between client and database
- Not atomic - if one step fails, data becomes inconsistent
- Slower performance (especially with many players)

**Solution:**

Create a PostgreSQL function that handles all operations in a single transaction.

**Implementation:**

```sql
-- Create the function
CREATE OR REPLACE FUNCTION create_match(
    p_game_id INT,
    p_player_ids INT[],
    p_winner_id INT
)
RETURNS TABLE(match_id INT, match_created_at TIMESTAMP) AS $$
DECLARE
    v_match_id INT;
    v_player_id INT;
    v_points INT;
BEGIN
    -- 1. Create match
    INSERT INTO matches (game_id)
    VALUES (p_game_id)
    RETURNING id INTO v_match_id;

    -- 2. Insert matches_players and update player points
    FOREACH v_player_id IN ARRAY p_player_ids
    LOOP
        -- Determine points
        v_points := CASE WHEN v_player_id = p_winner_id THEN 100 ELSE 50 END;

        -- Insert junction record
        INSERT INTO matches_players (match_id, player_id, is_winner, points_given)
        VALUES (v_match_id, v_player_id, v_player_id = p_winner_id, v_points);

        -- Update player points atomically
        UPDATE players
        SET points = points + v_points
        WHERE id = v_player_id;
    END LOOP;

    -- Return the created match info
    RETURN QUERY
    SELECT m.id, m.created_at
    FROM matches m
    WHERE m.id = v_match_id;
END;
$$ LANGUAGE plpgsql;
```

**Client-side usage:**

```js
// Replace client/src/lib/createMatch.js with:
import { supabase } from './supabase';

export async function createMatch({ game_id, playerIds, winnerPlayerId }) {
  try {
    const { data, error } = await supabase.rpc('create_match', {
      p_game_id: game_id,
      p_player_ids: playerIds,
      p_winner_id: winnerPlayerId
    });

    if (error) throw error;
    return { data: data[0], error: null };
  } catch (error) {
    return { data: null, error };
  }
}
```

**Benefits:**
- ✅ Single round-trip to database
- ✅ Atomic transaction (all-or-nothing)
- ✅ Better performance
- ✅ Simpler client code

---

### 2. Stricter Row Level Security (RLS) Policies

**Current Implementation:**

All tables use "allow all" policies:
```sql
CREATE POLICY "Allow all on games" ON games FOR ALL USING (true);
```

**Problem:**
- Anyone can read, insert, update, or delete any data
- No protection against malicious users
- Not production-ready for public deployment

**Solution:**

Implement granular policies based on operation type.

**Implementation (Basic Version - No Auth):**

```sql
-- Drop existing permissive policies
DROP POLICY IF EXISTS "Allow all on games" ON games;
DROP POLICY IF EXISTS "Allow all on players" ON players;
DROP POLICY IF EXISTS "Allow all on matches" ON matches;
DROP POLICY IF EXISTS "Allow all on matches_players" ON matches_players;

-- Games: Read-only for everyone (managed by admins only)
CREATE POLICY "Allow read games" ON games
    FOR SELECT USING (true);

-- Players: Read for everyone, no public writes
CREATE POLICY "Allow read players" ON players
    FOR SELECT USING (true);

-- Matches: Read for everyone, no public writes
CREATE POLICY "Allow read matches" ON matches
    FOR SELECT USING (true);

CREATE POLICY "Allow read matches_players" ON matches_players
    FOR SELECT USING (true);
```

**Implementation (With Supabase Auth):**

If you add Supabase Auth in the future:

```sql
-- Players: Read for everyone, users can only update their own profile
CREATE POLICY "Allow read players" ON players
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON players
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Matches: Authenticated users can create matches
CREATE POLICY "Allow read matches" ON matches
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create matches" ON matches
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Matches_players: Authenticated users can insert
CREATE POLICY "Allow read matches_players" ON matches_players
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert match players" ON matches_players
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

**Alternative: Service Role Key for Admin Operations**

Another approach is to keep RLS strict and use Supabase's service role key for admin operations (like creating matches) from a secure server-side API route:

```js
// In a Next.js API route or secure backend
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Bypasses RLS
);

// Now this can write to the database regardless of RLS policies
await supabaseAdmin.from('matches').insert({ game_id: 1 });
```

**Recommended Approach:**

For this app, start with:
1. **Read-only public access** for games, players, matches
2. **Server-side match creation** using service role key (move `createMatch` to an API route)
3. **Add Supabase Auth later** if you need user accounts