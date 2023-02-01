import { Link } from "react-router-dom";
import { postSession } from "../api";

function IndividualUser({ user, match, sessionsError, isLoading }) {
  return (
    <li className="matches__match__li" key={match.username}>
      <h3 className="matches__match__li__p">{match.username} </h3>
      <h4 className="matches__match__li__p">
        Distance from you: {match.distance}
      </h4>
      <div className="matches__match__li__games">
        <h4>Favourite games: </h4>
        <ul>
          {match.games.map((game) => {
            return (
              <li
                className="matches__match__li__games__game"
                key={`${match.username} ${game.name}`}
              >
                <p className="matches__match__li__games__game__p">
                  <b>Title</b>: {game.name}
                  <span> | </span>
                  <b>Category</b>:{" "}
                  <span className="category__slug">{game.category_slug.replaceAll("-", " ")}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      {sessionsError ? <p className="error">{sessionsError}</p> : null}
      {isLoading ? (
        <p>Loading sessions...</p>
      ) : match.session ? (
        <Link id="link_button" to={`/session/${match.session}`}>
          Go to chat
        </Link>
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
