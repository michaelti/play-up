import "./MatchPlayer.scss";

export default function MatchPlayer({ name, image, isWinner, pointChange }) {
  return (
    <div className="match-player">
      <div
        className={`match-player__image-wrapper ${
          isWinner ? "match-player__image-wrapper--winner" : ""
        }`}
      >
        <img
          src={image}
          alt=""
          className={`match-player__image ${
            isWinner ? "match-player__image--winner" : ""
          }`}
        />
      </div>
      <span className="match-player__name">{name}</span>
    </div>
  );
}
