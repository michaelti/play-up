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
            .map((player) => {
              const image = player.image_url
                ? import.meta.env.VITE_BACKEND_URL + player.image_url
                : `https://api.dicebear.com/9.x/initials/svg?seed=${player.name}`;

              return (
                <RankCard
                  key={player.id}
                  icon={image}
                  name={player.name}
                  points={player.points}
                />
              );
            })}
        </section>
      </div>
    </main>
  );
}
