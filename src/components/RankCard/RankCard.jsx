import "./RankCard.scss";

export default function RankCard({ name, points, icon }) {
  return (
    <article className="rank-card">
      <img className="rank-card__icon" src={icon} alt="" />
      <h2 className="rank-card__title">{name}</h2>
      <span className="rank-card__points">{points}</span>
    </article>
  );
}
