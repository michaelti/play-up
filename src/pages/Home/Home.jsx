import "./Home.scss";
import useSupabaseQuery from "../../hooks/useSupabaseQuery";
import NewMatchForm from "../../components/NewMatchForm/NewMatchForm";
import RecentMatches from "../../components/RecentMatches/RecentMatches";

export default function Recent() {
  const [matches, loading, error, refetchMatches] = useSupabaseQuery(
    'matches',
    `
      *,
      game:games(*),
      players:matches_players(
        *,
        player:players(*)
      )
    `,
    { orderBy: { column: 'created_at', ascending: false } }
  );

  if (loading) {
    return <></>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const transformedMatches = matches?.map(match => ({
    ...match,
    players: match.players.map(mp => ({
      ...mp.player,
      isWinner: mp.is_winner,
      pointsGiven: mp.points_given
    }))
  }));

  return (
    <main className="home-page">
      <div className="home-page__container">
        <NewMatchForm onSave={refetchMatches} />
        <RecentMatches matches={transformedMatches || []} />
      </div>
    </main>
  );
}
