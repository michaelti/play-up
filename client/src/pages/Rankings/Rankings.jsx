import "./Rankings.scss";
import useAxios from "../../hooks/useAxios";
import RankCard from "../../components/RankCard/RankCard";

export default function Rankings() {
  const [players, loading, error] = useAxios("/players");

  if (loading) {
    return <></>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="rankings-page">
      <section className="rankings-page__list">
        {players.map((player) => (
          <RankCard
            key={player.id}
            icon={import.meta.env.VITE_BACKEND_URL + player.imageUrl}
            name={player.name}
            points={player.points}
          />
        ))}
      </section>
    </main>
  );
}
