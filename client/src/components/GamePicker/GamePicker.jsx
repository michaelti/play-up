import "./GamePicker.scss";
import GameCard from "../GameCard/GameCard";
import { useState } from "react";

export default function GamePicker({ games, onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (id, i) => {
    setSelected(i);
    onSelect(id);
  };

  return (
    <div className="game-picker">
      {games.map((game, i) => (
        <div
          key={game.id}
          className={`game-picker__slide ${
            i === selected ? "game-picker__slide--selected" : ""
          }`}
          onClick={() => handleClick(game.id, i)}
        >
          <GameCard
            id={game.id}
            title={game.name}
            img={import.meta.env.VITE_BACKEND_URL + game.image_url}
          />
        </div>
      ))}
    </div>
  );
}
