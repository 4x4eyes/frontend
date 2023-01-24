import { Link } from "react-router-dom";
import "../index.css"

export default function Nav() {
  return (
    <div className="navbar">
      <p>
        <Link>Find Matches</Link>
      </p>
      <p>|</p>
      <p>
        <Link>Meetups</Link>
      </p>
      <p>|</p>
      <p>
        <Link>Messages</Link>
      </p>
    </div>
  );
}
