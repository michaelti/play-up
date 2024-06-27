import "./GamePicker.scss";
import useAxios from "../../hooks/useAxios";

export default function GamePicker({ onChange, value }) {
  const [games, loading, error] = useAxios("/games");

  if (loading) {
    return <></>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="game-picker">
      {games.map((game) => (
        <div
          className={`game-picker-item ${
            value && value.id !== game.id ? "game-picker-item--dismissed" : ""
          }`}
          key={game.id}
        >
          <input
            className="game-picker-item__input"
            id={"game-picker-" + game.id}
            type="radio"
            name="game-picker"
            value={game.id}
            checked={value?.id === game.id}
            onChange={() => onChange(game)}
            onClick={() => value?.id === game.id && onChange(null)}
          />
          <label
            className="game-picker-item__label"
            htmlFor={"game-picker-" + game.id}
          >
            <img
              className="game-picker-item__image"
              src={import.meta.env.VITE_BACKEND_URL + game.image_url}
              alt={game.name}
            />
          </label>
        </div>
      ))}
    </div>
  );
}
