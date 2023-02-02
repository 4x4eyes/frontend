import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Nav({ isAuthenticated, user }) {
  const { logout } = useAuth0();

  return (
    <div className="navbar">
      <Link className="navbar__link" to="/find-matches">
        <p>Find Matches</p>
      </Link>
      <p>|</p>
      <Link className="navbar__link" to="/messages">
        <p>Messages</p>
      </Link>
      <p>|</p>
      <Link className="navbar__link" to="/">
        <p>Profile ({user.nickname})</p>
      </Link>
      <p>|</p>
      <Link
        className="navbar__link"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        <p>Log Out</p>
      </Link>
    </div>
  );
}
