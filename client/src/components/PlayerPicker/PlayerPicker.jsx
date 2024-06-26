import "./PlayerPicker.scss";
import useAxios from "../../hooks/useAxios";
import Player from "../Player/Player";

export default function PlayerPicker() {
  const [players, loading, error] = useAxios("/players"); // TODO: the parent has this data already

  if (loading) {
    return <></>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="players">
      {players.map((player) => (
        <Player icon={player.image_url} name={player.name} />
      ))}
    </section>
  );
}
