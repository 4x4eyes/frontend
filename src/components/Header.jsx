import { Link } from "react-router-dom";
import "../index.css";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

export default function Header() {
  return (
    <main>
      <Link to="/">
        <h1>Binder</h1>
      </Link>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </main>
  );
}
