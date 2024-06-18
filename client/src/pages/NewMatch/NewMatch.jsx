import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import NewMatchForm from "../../components/NewMatchForm/NewMatchForm";
import "./NewMatch.scss";

export default function NewMatch() {
  const { gameId } = useParams();
  const [game, loading, error] = useAxios(`/games/${gameId}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="new-match">
      <div className="new-match__container">
        <h1 className="new-match__title">Record a Match</h1>
        <NewMatchForm game={game} />
      </div>
    </section>
  );
}
