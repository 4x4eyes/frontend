import { Link } from "react-router-dom";
import "../index.css";

export default function Header({ user, isAuthenticated, isAuth0Loading }) {
  return (
    <Link to="/">
      <header>
        <h1>I'M BOARD</h1>
      </header>
    </Link>
  );
}
