import useAxios from "../../hooks/useAxios";
import useAxiosPost from "../../hooks/useAxiosPost";
import Select from "react-select";
import "./NewMatchForm.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GamePicker from "../GamePicker/GamePicker";

export default function NewMatchForm() {
  const [games, loadingGames, errorGames] = useAxios(`/games`);
  const [players, loading, error] = useAxios(`/players`);
  const [_newMatch, _newMatchLoading, _newMatchError, postMatchFn] =
    useAxiosPost(`/matches`);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState(null);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();

  if (loading || loadingGames) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (errorGames) {
    return <div>Error: {errorGames.message}</div>;
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

  const handleSelectGame = (id) => {
    setSelectedGame(id);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>What are you playing?</h2>

      <GamePicker games={games} onSelect={handleSelectGame} />

      {selectedGame && (
        <>
          <h2>Who's in?</h2>
          <Select
            value={selectedPlayers}
            isMulti
            onChange={(selectedPlayers) => setSelectedPlayers(selectedPlayers)}
            options={playersList}
            placeholder="Select players..."
          />
          <h2>Who won?</h2>
          <Select
            value={selectedWinner}
            onChange={(selectedWinner) => setSelectedWinner(selectedWinner)}
            options={selectedPlayers}
            isDisabled={!selectedPlayers}
            placeholder={
              selectedPlayers ? "Select winner..." : "Select players first..."
            }
          />
          <button disabled={formSubmitted} className="form__btn">
            Save Match Details
          </button>
          {formSubmitted && (
            <p className="form__success">
              Saved! Redirecting to Recent page...
            </p>
          )}
        </>
      )}
    </form>
  );
}
