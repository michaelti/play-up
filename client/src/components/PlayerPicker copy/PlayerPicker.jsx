import "./PlayerPicker.scss";
import useAxios from "../../hooks/useAxios";
import Player from "../Player/Player";
import getPlayerImage from "../../utils/getImage";

export default function PlayerPicker({ onChange, value }) {
  const [players, loading, error] = useAxios("/players");

  const handleChange = (event, player) => {
    if (event.target.checked) {
      onChange([...value, player]);
    } else {
      onChange(value.filter((item) => item.id !== player.id));
    }
  };

  if (loading) {
    return <></>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="player-picker">
      {players.map((player) => (
        <div className="player-picker-item" key={player.id}>
          <input
            className="player-picker-item__input"
            type="checkbox"
            id={"player-picker-" + player.id}
            name="player-picker"
            value={player.id}
            checked={value.some((item) => item.id === player.id)}
            onChange={(event) => handleChange(event, player)}
          />
          <label
            className="player-picker-item__label"
            htmlFor={"player-picker-" + player.id}
          >
            <img
              className="player-picker-item__image"
              src={getPlayerImage(player)}
              alt={player.name}
              title={player.name}
            />
          </label>
        </div>
      ))}
    </section>
  );
}
