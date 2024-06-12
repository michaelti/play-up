import useAxios from "../../hooks/useAxios";
import useAxiosPost from "../../hooks/useAxiosPost";
import Select from "react-select";
import "./NewMatchForm.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewMatchForm({ game }) {
  const [players, loading, error] = useAxios(`/players`);
  const [newMatch, newMatchLoading, newMatchError, postMatchFn] =
    useAxiosPost(`/match-results`);
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();

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

    postMatchFn({
      gameId: game.id,
      playerIds: [selectedOption[0].value, selectedOption[1].value],
      winnerPlayerId: selectedOption[0].value,
    });

    navigate("/recent");
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
