import { Link } from "react-router-dom";
import { postSession } from "../api";

function IndividualUser({ user, match, sessionsError, isLoading }) {
  return (
    <li className="matches__match__li" key={match.username}>
      <p className="matches__match__li__p">{match.username} </p>
      <p className="matches__match__li__p">{match.distance}</p>
      <ul className="matches__match__li__games">
        {match.games.map((game) => {
          return (
            <li
              className="matches__match__li__games__game"
              key={`${match.username} ${game.name}`}
            >
              <p className="matches__match__li__games__game__p">{game.name}</p>
              <p className="matches__match__li__games__game__p">
                {game.category_slug}
              </p>
            </li>
          );
        })}
      </ul>
      {sessionsError ? <p className="error">{sessionsError}</p> : null}
      {isLoading ? (
        <p>Loading sessions...</p>
      ) : match.session ? (
        <Link to={`/session/${match.session}`}>Go to chat</Link>
      ) : (
        <button
          onClick={() => {
            postSession(user.nickname, match.username)
              .then(() => {
                window.location.reload(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Create Session
        </button>
      )}
    </li>
  );
}

export default IndividualUser;
