import useAxios from "../../hooks/useAxios";
import "./Library.scss";
import GameCard from "../../components/GameCard/GameCard";

export default function Library() {
  const [games, loading, error] = useAxios("/games");
  console.log(games);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="library-page">
      <h1 className="library-page__title">PlayUp</h1>
      {games.map((game) => (
        <GameCard
          key={game.id}
          title={game.name}
          img={import.meta.env.VITE_BACKEND_URL + game.imageUrl}
        />
      ))}
    </main>
  );
}
