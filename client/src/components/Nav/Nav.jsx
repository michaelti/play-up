import { NavLink, Link } from "react-router-dom";
import "./Nav.scss";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav__container">
        <h1 className="nav__title">
          <Link to="/" className="nav__title-link">
            PlayUp
          </Link>
        </h1>

        <div className="nav__links">
          <NavLink to="/" className="nav__link">
            Home
          </NavLink>
          <NavLink to="/leaderboard" className="nav__link">
            Leaderboard
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
