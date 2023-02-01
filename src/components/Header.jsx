import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ user, isAuthenticated, isAuth0Loading }) {
  return (
    <Link to="/">
      <header>
        <img
          className="scrabble__letters"
          src="https://i.ibb.co/c3tNmhc/Scrabble-tile-I-wood.jpg"
          alt="I"
        />
        <p className="scrabble__p">'</p>
        <img
          className="scrabble__letters"
          src="https://i.ibb.co/tZL9xvr/Scrabble-tile-M-wood.jpg"
          alt="M"
        />
        <p className="scrabble__p"> </p>
        <img
          className="scrabble__letters"
          src="https://i.ibb.co/Cb1gfB7/Scrabble-tile-B-wood.jpg"
          alt="B"
        />
        <img
          className="scrabble__letters"
          src="https://i.ibb.co/QPd8k7H/Scrabble-tile-O-wood.jpg"
          alt="O"
        />
        <img
          className="scrabble__letters"
          src="https://i.ibb.co/9cqZqw0/Scrabble-tile-A-wood.jpg"
          alt="A"
        />
        <img
          className="scrabble__letters"
          src="https://i.ibb.co/p1cfRvg/Scrabble-tile-R-wood.jpg"
          alt="R"
        />
        <img
          className="scrabble__letters"
          src="https://i.ibb.co/YT5J8y6/Scrabble-tile-D-wood.jpg"
          alt="D"
        />
      </header>
    </Link>
  );
}
