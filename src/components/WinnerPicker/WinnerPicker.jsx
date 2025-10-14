import "./WinnerPicker.scss";
import { getPlayerImage } from "../../utils/getImage";

export default function WinnerPicker({ onChange, value, options }) {
  return (
    <section className="winner-picker">
      {options.map((player) => (
        <div className="winner-picker-item" key={player.id}>
          <input
            className="winner-picker-item__input"
            type="checkbox"
            id={"winner-picker-" + player.id}
            name="winner-picker"
            value={player.id}
            checked={value?.id === player.id}
            onChange={() => onChange(player)}
          />
          <label
            className="winner-picker-item__label"
            htmlFor={"winner-picker-" + player.id}
          >
            <img
              className="winner-picker-item__image"
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
