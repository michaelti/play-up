import useAxios from "../../hooks/useAxios";
import "./Library.scss";
import GameCard from "../../components/GameCard/GameCard";
import plusIcon from "../../assets/plus.svg";

export default function Library() {
  const [games, loading, error] = useAxios("/games");

  if (loading) {
    return <></>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="library-page">
      <div className="library-page__container">
        <section className="library-page__grid">
          {games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.name}
              img={import.meta.env.VITE_BACKEND_URL + game.imageUrl}
            />
          ))}

          <GameCard id="" title="Add a game" img={plusIcon} />
        </section>
      </div>
    </main>
  );
}
