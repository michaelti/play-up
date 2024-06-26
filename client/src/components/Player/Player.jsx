import "./Player.scss";

export default function Player({ icon, name }) {
  // TODO: Duplication from Rankings.jsx
  const image = icon
    ? import.meta.env.VITE_BACKEND_URL + icon
    : `https://api.dicebear.com/9.x/initials/svg?seed=${name}`;

  return (
    <img
      className="player"
      src={image}
      alt=""
    />
  );
}
