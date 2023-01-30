import React from "react";

function IndividualUser({ key, match }) {
  console.log(match);
  return (
    <li key={key}>
      <div className="individual-match">
        <p>{match.username} </p>
        <p>{match.distance}</p>
        <ul>
          {match.games.map((game) => {
            return (
              <li key={`${key} ${game.name}`}>
                <p>{game.name}</p>
                <p>{game.category_slug}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export default IndividualUser;
