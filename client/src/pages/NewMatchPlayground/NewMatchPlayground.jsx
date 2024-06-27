import GamePicker from "../../components/GamePicker/GamePicker";
import { useState } from "react";

export default function NewMatchPlayground() {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleChangeGame = (game) => {
    setSelectedGame(game);
  };

  return (
    <>
      <GamePicker onChange={handleChangeGame} value={selectedGame} />
    </>
  );
}
