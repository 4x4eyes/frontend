import { Link } from "react-router-dom";
import "../index.css";

export default function Nav() {
  return (
    <div className="navbar">
      <Link>
        <p>Find Matches</p>
      </Link>
      <p>|</p>
      <Link>
        <p>Meetups</p>
      </Link>
      <p>|</p>
      <Link>
        <p>Messages</p>
      </Link>
    </div>
  );
}
