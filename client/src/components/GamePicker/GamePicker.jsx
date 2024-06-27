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
    <div>
      {games.map((game) => (
        <div className="game-picker-item" key={game.id}>
          <input
            className="game-picker-item__input"
            id={"game-picker-" + game.id}
            type="radio"
            name="game-picker"
            value={game.id}
            checked={value?.id === game.id}
            onChange={() => onChange(game)}
          />
          <label
            className="game-picker-item__label"
            htmlFor={"game-picker-" + game.id}
          >
            <img src={game} alt="" />
            {game.name}
          </label>
        </div>
      ))}
    </div>
  );
}
