import "./Recent.scss";
import useAxios from "../../hooks/useAxios";
import MatchCard from "../../components/MatchCard/MatchCard";

export default function Recent() {
  const [matchResults, loading, error] = useAxios("/match-results");
  const [players, loadingPlayers, errorPlayers] = useAxios("/players");

  if (loading || loadingPlayers) {
    return <></>;
  }

  if (error || errorPlayers) {
    return <div>Error: {error.message || errorPlayers.message}</div>;
  }

  return (
    <main className="recent-page">
      <div className="recent-page__container">
        <section className="recent-page__list">
          {!matchResults.length && <p>No recent matches...</p>}
          {matchResults.map((matchResult) => (
            <MatchCard
              key={matchResult.id}
              timestamp={matchResult.timestamp}
              playerIds={matchResult.playerIds}
              winnerPlayerId={matchResult.winnerPlayerId}
              allPlayersData={players}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
