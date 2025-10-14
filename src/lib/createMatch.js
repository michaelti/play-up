import { supabase } from './supabase';

export async function createMatch({ game_id, playerIds, winnerPlayerId }) {
  try {
    const { data: match, error: matchError } = await supabase
      .from('matches')
      .insert({ game_id })
      .select()
      .single();

    if (matchError) throw matchError;

    const matchPlayers = playerIds.map(playerId => ({
      match_id: match.id,
      player_id: playerId,
      is_winner: playerId === winnerPlayerId,
      points_given: playerId === winnerPlayerId ? 100 : 50
    }));

    const { error: mpError } = await supabase
      .from('matches_players')
      .insert(matchPlayers);

    if (mpError) throw mpError;

    for (const playerId of playerIds) {
      const points = playerId === winnerPlayerId ? 100 : 50;

      const { data: player, error: getError } = await supabase
        .from('players')
        .select('points')
        .eq('id', playerId)
        .single();

      if (getError) throw getError;

      const { error: updateError } = await supabase
        .from('players')
        .update({ points: player.points + points })
        .eq('id', playerId);

      if (updateError) throw updateError;
    }

    return { data: match, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
