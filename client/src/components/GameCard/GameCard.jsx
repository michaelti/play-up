import "./GameCard.scss";

export default function GameCard({ title, img }) {
  return (
    <article className="game-card">
      <img className="game-card__thumbnail" src={img} alt={title} />
    </article>
  );
}
