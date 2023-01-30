import { Link } from "react-router-dom";

function IndividualUser({ user, match, sessions, sessionsError, isLoading }) {
  console.log(user, "user")
  console.log(match, "match")
  console.log(sessions, "sessions")  

  return (
    <li className="matches__match__li" key={match.username}>
        <p className="matches__match__li__p">{match.username} </p>
        <p className="matches__match__li__p">{match.distance}</p>
        <ul className="matches__match__li__games">
          {match.games.map((game) => {
            return (
              <li className="matches__match__li__games__game" key={`${match.username} ${game.name}`}>
                <p className="matches__match__li__games__game__p">{game.name}</p>
                <p className="matches__match__li__games__game__p">{game.category_slug}</p>
              </li>
            );
          })}
        </ul>
        { sessionsError ? <p className="error">{sessionsError}</p> : null }
        { isLoading ? <p>Loading sessions...</p> : match.session ? <Link to={`/session/${match.session}`}>Go to chat</Link> : <Link to="/">Create Session</Link> }
    </li>
  );
}

export default IndividualUser;
