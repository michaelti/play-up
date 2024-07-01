import useAxiosPost from "../../hooks/useAxiosPost";
import "./NewMatchForm.scss";
import { useState } from "react";
import PlayerPicker from "../PlayerPicker/PlayerPicker";
import WinnerPicker from "../WinnerPicker/WinnerPicker";
import GamePicker from "../GamePicker/GamePicker";

export default function NewMatchForm({ onSave }) {
  const [_newMatch, _newMatchLoading, _newMatchError, postMatchFn] =
    useAxiosPost(`/matches`);
  const [players, setPlayers] = useState([]);
  const [isDoneSelectingPlayers, setIsDoneSelectingPlayers] = useState(false);
  const [winner, setWinner] = useState(null);
  const [game, setGame] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    await postMatchFn({
      game_id: game.id,
      playerIds: players.map((player) => player.id),
      winnerPlayerId: winner.id,
    });

    await onSave();

    setWinner(null);
    setPlayers([]);
    setIsDoneSelectingPlayers(false);
    setGame(null);
    setIsSubmitting(false);
  };

  let message = "Pick a game";

  if (game) {
    message = "Pick players";
  }

  if (game && isDoneSelectingPlayers) {
    message = "Pick a winner";
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <header className="form__header">
        <h2 className="form__title">{message}</h2>

        <div className="form__buttons">
          {game && !isDoneSelectingPlayers && (
            <>
              <button
                className="form__btn form__btn--back"
                type="button"
                onClick={() => setGame(null)}
                disabled={isSubmitting}
              >
                &larr; Back
              </button>
              <button
                className="form__btn"
                type="button"
                onClick={() => setIsDoneSelectingPlayers(true)}
                disabled={players.length === 0}
              >
                Next &rarr;
              </button>
            </>
          )}

          {game && isDoneSelectingPlayers && (
            <>
              <button
                className="form__btn form__btn--back"
                type="button"
                onClick={() => setIsDoneSelectingPlayers(false)}
                disabled={isSubmitting}
              >
                &larr; Back
              </button>
              <button
                className="form__btn form__btn--save"
                disabled={!winner || isSubmitting}
              >
                Save &#10003;
              </button>
            </>
          )}
        </div>
      </header>

      <div className="form__game-picker">
        <GamePicker value={game} onChange={setGame}>
          {game && !isDoneSelectingPlayers && (
            <PlayerPicker value={players} onChange={setPlayers} />
          )}

          {isDoneSelectingPlayers && (
            <WinnerPicker
              value={winner}
              onChange={setWinner}
              options={players}
            />
          )}
        </GamePicker>
      </div>
    </form>
  );
}
