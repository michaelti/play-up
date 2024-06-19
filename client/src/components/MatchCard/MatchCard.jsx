import "./MatchCard.scss";

export default function MatchCard({ timestamp, players, game }) {
  const formattedTime = new Date(timestamp).toLocaleString();

  return (
    <article className="match-card">
      <span className="match-card__players">
        <img
          src={import.meta.env.VITE_BACKEND_URL + game.image_url}
          alt={game.name}
          className="match-card__game-icon"
        />

        {players.map((player) => (
          <img
            key={player.id}
            src={import.meta.env.VITE_BACKEND_URL + player.image_url}
            alt={player.name}
            className={`match-card__player-icon ${
              player.isWinner ? "match-card__player-icon--winner" : ""
            }`}
          />
        ))}
      </span>
      <span className="match-card__time">{formattedTime}</span>
    </article>
  );
}
