import "./MatchCard.scss";

export default function MatchCard({
  timestamp,
  allPlayersData,
  playerIds,
  winnerPlayerId,
}) {
  const formattedTime = new Date(timestamp).toLocaleString();
  const matchPlayers = allPlayersData.filter((player) =>
    playerIds.includes(player.id)
  );
  const winnerPlayer = allPlayersData.find(
    (player) => player.id === winnerPlayerId
  );

  return (
    <article className="match-card">
      <span className="match-card__players">
        {matchPlayers.map((player) => (
          <img
            key={player.id}
            src={import.meta.env.VITE_BACKEND_URL + player.imageUrl}
            alt={player.name}
            className={`match-card__player-icon ${
              player.id === winnerPlayer.id
                ? "match-card__player-icon--winner"
                : ""
            }`}
          />
        ))}
      </span>
      <span className="match-card__time">{formattedTime}</span>
    </article>
  );
}
