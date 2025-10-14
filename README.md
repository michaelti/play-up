# play-up

Pair Programming hackathon BrainStation London 2024


## Todo

- [ ] Update Supabase RLS to be more secure (see below)
- [ ] Update match creation to PostgreSQL function (see below)
- [ ] Typescript!
- [ ] Animations / sound effects
- [ ] Use route loaders instead of custom hook
- [ ] Testing
- [ ] Move todo to GitHub issues
- [x] Don't hardcode it being two players per match
- [x] Don't hardcode first player winning
- [x] Increment points
- [x] Database!
- [x] New Match Form: Filter dropdown of winners to only users who participated in that game

Nice-to-haves:

- [ ] Get players data from KG Portal

---

## Supabase (RLS) Row Level Security

RLS is enabled with public policies. This allows the client-side app to interact with Supabase but allows anyone with the supabase "anon key" to write data

RLS has been enabled on all tables with the following policies:
- `games`: Public read-only access
- `players`: Public read + write access
- `matches`: Public read + insert access
- `matches_players`: Public read + insert access

A couple of options if we want to lock down all tables to read-only:
1. Interact with Supabase via a Vercel serverless function, or
2) Use Supabase Auth to add auth to the app

### 1. Vercel Serverless function

Steps:
- Set RLS on all tables to read-only
- Create a Vercel serverless function (no need for Next.js) to interact with Supabase
- Use a Supabase [service role](https://supabase.com/docs/guides/api/api-keys#servicerole-and-secret-keys) to authenticate, which bypasses RLS
- Update client to call `/api/create-match` instead of Supabase directly

```js
// File: /api/create-match.js

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase
    .from('matches')
    .insert({ game_id: req.body.game_id });

  if (error) return res.status(500).json({ error });
  return res.status(200).json({ data });
}
```


### 2. Add auth via Supabase Auth

Steps:
- Setup Supabase Auth
- Update RLS to only allow authenticated users to interact with DB
- Add login/signup UI

---

## PostgreSQL Function for Match Creation

Match creation is handled client-side in `client/src/lib/createMatch.js` with multiple sequential queries:
1. Insert into `matches`
2. Insert into `matches_players`
3. Update each player's points (one query per player)

This isn't ideal since:
- Multiple round-trips between client and DB
- If one step fails, data will become inconsistent

Supabase supports [SQL Functions](https://supabase.com/docs/guides/database/functions) which could do the above in one step:

```sql
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
    -- Create match
    INSERT INTO matches (game_id)
    VALUES (p_game_id)
    RETURNING id INTO v_match_id;

    -- Insert matches_players and update player points
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

The frontend would need updating like so:

```js
// File: client/src/lib/createMatch.js with:

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