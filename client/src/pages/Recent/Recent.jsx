import "./Recent.scss";
import useAxios from "../../hooks/useAxios";
import MatchCard from "../../components/MatchCard/MatchCard";

export default function Recent() {
  const [match, loading, error] = useAxios("/matches");

  if (loading) {
    return <></>;
  }

  if (error) {
    return <div>Error: {error.message || errorPlayers.message}</div>;
  }

  return (
    <main className="recent-page">
      <div className="recent-page__container">
        <section className="recent-page__list">
          {!match.length && <p>No recent matches...</p>}

          {match.map((match) => (
            <MatchCard
              key={match.id}
              timestamp={match.created_at}
              players={match.players}
              game={match.game}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
