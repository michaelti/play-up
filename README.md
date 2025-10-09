# play-up

Pair Programming hackathon BrainStation London 2024

## Post-Supabase Migration TODOs

**Immediate:**
- [ ] Delete `/server` directory after confirming production works
- [ ] Remove VITE_BACKEND_URL from client/.env entirely

**Future Optimizations:**
- [ ] Migrate match creation to PostgreSQL function - see SCHEMA.md for details
- [ ] Implement stricter Row Level Security policies - see SCHEMA.md for details
- [ ] Add database indexes for better query performance:
  - `CREATE INDEX idx_matches_created_at ON matches(created_at DESC);`
  - `CREATE INDEX idx_players_points ON players(points DESC);`
  - `CREATE INDEX idx_matches_players_match ON matches_players(match_id);`
- [ ] Consider Supabase Auth for user authentication
- [ ] Add realtime updates with Supabase Realtime
- [ ] Enable image uploads with Supabase Storage

## Original TODOs

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
- [x] Migrate to Supabase (no more cold boot issues!)

Nice-to-haves:

- [ ] Get players data from KG Portal
