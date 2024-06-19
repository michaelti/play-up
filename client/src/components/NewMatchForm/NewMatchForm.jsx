import useAxios from "../../hooks/useAxios";
import useAxiosPost from "../../hooks/useAxiosPost";
import Select from "react-select";
import "./NewMatchForm.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewMatchForm({ game }) {
  const [players, loading, error] = useAxios(`/players`);
  const [_newMatch, _newMatchLoading, _newMatchError, postMatchFn] =
    useAxiosPost(`/matches`);
  const [selectedPlayers, setSelectedPlayers] = useState(null);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const playersList = players.map((player) => ({
    value: player.id,
    label: player.name,
  }));

  const handleSubmit = (event) => {
    event.preventDefault();

    const playerIds = selectedPlayers.map((winner) => winner.value);

    postMatchFn({
      game_id: game.id,
      playerIds,
      winnerPlayerId: selectedWinner.value,
    });

    setFormSubmitted(true);

    setTimeout(() => {
      navigate("/recent");
    }, 1000);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p>Game: {game.name}</p>
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}${game.image_url}`}
        alt={game.name}
        className="form__img"
      />
      <p>Who was playing?</p>
      <Select
        value={selectedPlayers}
        isMulti
        onChange={(selectedPlayers) => setSelectedPlayers(selectedPlayers)}
        options={playersList}
        placeholder="Select players..."
      />
      <p>Who won?</p>
      <Select
        value={selectedWinner}
        onChange={(selectedWinner) => setSelectedWinner(selectedWinner)}
        options={selectedPlayers}
        isDisabled={!selectedPlayers}
        placeholder={selectedPlayers ? "Select winner..." : "Select players first..."}
      />
      <button disabled={formSubmitted} className="form__btn">
        Save Match Details
      </button>
      {formSubmitted && (
        <p className="form__success">Saved! Redirecting to Recent page...</p>
      )}
    </form>
  );
}
