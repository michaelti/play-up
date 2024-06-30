import useAxiosPost from "../../hooks/useAxiosPost";
import "./NewMatchForm.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerPicker from "../PlayerPicker/PlayerPicker";
import WinnerPicker from "../WinnerPicker/WinnerPicker";
import { getGameImage } from "../../utils/getImage";

export default function NewMatchForm({ game }) {
  const [_newMatch, _newMatchLoading, _newMatchError, postMatchFn] =
    useAxiosPost(`/matches`);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    postMatchFn({
      game_id: game.id,
      playerIds: selectedPlayers.map((player) => player.id),
      winnerPlayerId: selectedWinner.id,
    });

    setFormSubmitted(true);

    setTimeout(() => {
      navigate("/recent");
    }, 1000);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p>Game: {game.name}</p>
      <img src={getGameImage(game)} alt={game.name} className="form__img" />
      <p>Who was playing?</p>
      <PlayerPicker value={selectedPlayers} onChange={setSelectedPlayers} />
      <p>Who won?</p>
      <WinnerPicker
        value={selectedWinner}
        onChange={setSelectedWinner}
        options={selectedPlayers}
      />
      <button disabled={formSubmitted || !selectedWinner} className="form__btn">
        Save Match Details
      </button>
      {formSubmitted && (
        <p className="form__success">Saved! Redirecting to Recent page...</p>
      )}
    </form>
  );
}
