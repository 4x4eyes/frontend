import { Link } from "react-router-dom";


export default function Nav() {
  return (
    <div className="navbar">
      <Link className="navbar__link" to="/find-matches">
        <p>Find Matches</p>
      </Link>
      <p>|</p>
      <Link className="navbar__link" to="meetups">
        <p>Meetups</p>
      </Link>
      <p>|</p>
      <Link className="navbar__link" to="messages">
        <p>Messages</p>
      </Link>
    </div>
  );
}
