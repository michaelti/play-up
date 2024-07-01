import "./Home.scss";
import useAxios from "../../hooks/useAxios";
import NewMatchForm from "../../components/NewMatchForm/NewMatchForm";
import RecentMatches from "../../components/RecentMatches/RecentMatches";

export default function Recent() {
  const [matches, loading, error, refetchMatches] = useAxios("/matches");

  if (loading) {
    return <></>;
  }

  if (error) {
    return <div>Error: {error.message || errorPlayers.message}</div>;
  }

  return (
    <main className="home-page">
      <div className="home-page__container">
        <NewMatchForm onSave={refetchMatches} />
        <RecentMatches matches={matches} />
      </div>
    </main>
  );
}
