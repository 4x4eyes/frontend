import React from "react";

function IndividualUser({ match }) {
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
    </li>
  );
}

export default IndividualUser;
