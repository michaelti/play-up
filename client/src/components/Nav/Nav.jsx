import { NavLink, Link } from "react-router-dom";
import "./Nav.scss";

export default function Nav() {
  return (
    <nav className="nav">
      <h1 className="nav__title">
        <Link to="/" className="nav__title-link">
          PlayUp
        </Link>
      </h1>

      <div className="nav__links">
        <NavLink to="/" className="nav__link">
          Library
        </NavLink>
        <NavLink to="/rankings" className="nav__link">
          Rankings
        </NavLink>
        <NavLink to="/recent" className="nav__link">
          Recent
        </NavLink>
      </div>
    </nav>
  );
}
