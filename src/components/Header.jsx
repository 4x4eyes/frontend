import { Link } from "react-router-dom";
import "../index.css";

export default function Header() {
  return (
    <Link to="/">
      <h1>Binder</h1>
    </Link>
  );
}
