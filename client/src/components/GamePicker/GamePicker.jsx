import "./GamePicker.scss";
import useAxios from "../../hooks/useAxios";
import { useState, Children } from "react";

export default function GamePicker({ onChange, value, children }) {
  const [games, loading, error] = useAxios("/games");
  const [topOfStack, setTopOfStack] = useState(0);

  const handleChange = (game, i) => {
    onChange(game);
    setTopOfStack(i);
  };

  if (loading) {
    return <></>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const hasChildren = Children.toArray(children).some((child) => !!child);

  return (
    <div className={`game-picker ${value ? "game-picker--done" : ""}`}>
      {games.map((game, i) => (
        <div
          className={`game-picker-item ${
            value ? "game-picker-item--done" : ""
          }`}
          style={{
            "--stackPosition": games.length - Math.abs(topOfStack - i),
          }}
          key={game.id}
        >
          <input
            className="game-picker-item__input"
            id={"game-picker-" + game.id}
            type="radio"
            name="game-picker"
            value={game.id}
            checked={value?.id === game.id}
            onChange={() => handleChange(game, i)}
            onClick={() => value?.id === game.id && handleChange(null, i)}
          />
          <label
            className="game-picker-item__label"
            htmlFor={"game-picker-" + game.id}
          >
            <img
              className="game-picker-item__image"
              src={import.meta.env.VITE_BACKEND_URL + game.image_url}
              alt={game.name}
              title={game.name}
            />
          </label>
        </div>
      ))}

      {hasChildren && <div className="game-picker__children">{children}</div>}
    </div>
  );
}
