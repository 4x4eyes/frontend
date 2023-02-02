import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function Nav({isAuthenticated, user}) {
  return (
    <div className="navbar">
      <Link className="navbar__link" to="/find-matches">
        <p>Find Matches</p>
      </Link>
      <p>|</p>
      <Link className="navbar__link" to="/messages">
        <p>Messages</p>
      </Link>
      { isAuthenticated ? (
    <div className="profile">
      <div className="profile__body">
        <h2 className="profile__username">{user.nickname}</h2>
        <Link className="profile__updateProfile" to={`/`}>
          <button className="profile__updateProfile__button">
            Update Profile
          </button>
        </Link>
        <LogoutButton />
      </div>
    </div>
  ) : (
    <LoginButton />
  )}
    </div>
  );
}
