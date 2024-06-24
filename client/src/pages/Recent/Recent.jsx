import "./Recent.scss";
import useAxios from "../../hooks/useAxios";
import MatchCard from "../../components/MatchCard/MatchCard";
import NewMatchForm from "../../components/NewMatchForm/NewMatchForm";

export default function Recent() {
  const [matches, loading, error] = useAxios("/matches");

  if (loading) {
    return <></>;
  }

  if (error) {
    return <div>Error: {error.message || errorPlayers.message}</div>;
  }

  return (
    <main className="recent-page">
      <div className="recent-page__container">
        <section className="recent-page__form">
          <NewMatchForm />
        </section>

        <section className="recent-page__history">
          <h2>History</h2>
          <div className="recent-page__list">
            {!matches.length && <p>No recent matches...</p>}

            {matches.map((match) => (
              <MatchCard
                key={match.id}
                timestamp={match.created_at}
                players={match.players}
                game={match.game}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
