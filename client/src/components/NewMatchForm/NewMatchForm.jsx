import useAxios from "../../hooks/useAxios";
import useAxiosPost from "../../hooks/useAxiosPost";
import Select from "react-select";
import "./NewMatchForm.scss";
import { useState } from "react";

export default function NewMatchForm({ game }) {
  const [players, loading, error] = useAxios(`/players`);
  const [newMatch, newMatchLoading, newMatchError, postMatchFn] =
    useAxiosPost(`/match-results`);
  const [selectedOption, setSelectedOption] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const selectOptions = players.map((player) => ({
    value: player.id,
    label: player.name,
  }));

  const handleSubmit = (event) => {
    event.preventDefault();

    // postMatchFn({
    //   gameId: "8eb517e8-dcb2-4464-8e9d-9be6050abf6a",
    //   playerIds: [
    //       "a43f1982-654b-4486-b110-50e3334042b1",
    //       "23a2111d-a516-4d3d-9173-9799a47ae336"
    //   ],
    //   winnerPlayerId: "a43f1982-654b-4486-b110-50e3334042b1",
    // }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p>Game: {game.name}</p>
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}${game.imageUrl}`}
        alt={game.name}
        className="form__img"
      />
      <p>Players:</p>
      <p>Who won?</p>
      <Select
        value={selectedOption}
        isMulti
        onChange={(selectedOption) => setSelectedOption(selectedOption)}
        options={selectOptions}
      />
      <button>Save Match Details</button>
    </form>
  );
}
