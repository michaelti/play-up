import "./GameCard.scss";
import { Link } from "react-router-dom";

export default function GameCard({ title, img }) {
  return (
    <article>
      <Link to="/">
        <h2>{title}</h2>
        <img src={img} alt="" />
      </Link>
    </article>
  );
}
