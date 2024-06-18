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
      <div className="rankings-page__container">
        <section className="rankings-page__list">
          {players
            .sort((a, b) => b.points - a.points)
            .map((player) => (
              <RankCard
                key={player.id}
                icon={import.meta.env.VITE_BACKEND_URL + player.image_url}
                name={player.name}
                points={player.points}
              />
            ))}
        </section>
      </div>
    </main>
  );
}
