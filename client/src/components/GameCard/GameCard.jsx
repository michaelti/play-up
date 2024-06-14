import "./GameCard.scss";
import { Link } from "react-router-dom";

export default function GameCard({ title, img, id }) {
  return (
    <article className="game-card">
      <Link to={`/new-match/${id}`} className="game-card__link">
        <img className="game-card__thumbnail" src={img} alt="" />
        <h2 className="game-card__title">{title}</h2>
      </Link>
    </article>
  );
}
