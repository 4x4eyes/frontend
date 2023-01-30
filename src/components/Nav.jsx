import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="navbar">
      <Link to="/find-matches">
        <p>Find Matches</p>
      </Link>
      <p>|</p>
      <Link to="meetups">
        <p>Meetups</p>
      </Link>
      <p>|</p>
      <Link to="/messages">
        <p>Messages</p>
      </Link>
    </div>
  );
}
