import MatchPlayer from "../MatchPlayer/MatchPlayer";
import "./MatchCard.scss";
import { formatRelative } from "date-fns";

export default function MatchCard({ timestamp, players, game }) {
  const formattedTime = formatRelative(new Date(timestamp), new Date());

  return (
    <article className="match-card">
      <header className="match-card__header">
        <img
          className="match-card__game-icon"
          src={import.meta.env.VITE_BACKEND_URL + game.image_url}
          alt=""
        />
        <div>
          <h2 className="match-card__title">{game.name}</h2>
          <span className="match-card__time">{formattedTime}</span>
        </div>
      </header>
      <div className="match-card__players">
        {players
          .toSorted((a, b) => b.isWinner - a.isWinner)
          .map((player) => {
            const image = player.image_url
              ? import.meta.env.VITE_BACKEND_URL + player.image_url
              : `https://api.dicebear.com/9.x/initials/svg?seed=${player.name}`;

            return (
              <MatchPlayer
                key={player.id}
                image={image}
                name={player.name}
                isWinner={player.isWinner}
                pointsGiven={player.pointsGiven}
              />
            );
          })}
      </div>
    </article>
  );
}
