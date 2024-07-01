import "./RecentMatches.scss";
import MatchCard from "../../components/MatchCard/MatchCard";

export default function RecentMatches({ matches }) {
  return (
    <section className="recent-matches">
      <h2 className="recent-matches__title">History</h2>

      <div className="recent-matches__list">
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
  );
}
