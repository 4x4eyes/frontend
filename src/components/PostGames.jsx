import { getGamesByUsername, postGameByUsername } from "../api";
import { useState, useEffect } from "react";
import "./PostGames.css";

export default ({ user, setCurrentGames, setError }) => {
  const [game, setGame] = useState({ game_name: "", category_id: "1" });

  useEffect(() => {
    getGamesByUsername(user.nickname).then((games) => setCurrentGames(games));
  }, []);

  return (
    <div className="postGames">
      <p>Add a new Game:</p>
      <form
        className="postGames__form"
        onSubmit={(e) => {
          e.preventDefault();
          postGameByUsername(user.nickname, game)
            .then(() => {
              getGamesByUsername(user.nickname).then((games) =>
                setCurrentGames(games)
              );
            })
            .catch((e) => {
              getGamesByUsername(user.nickname).then((games) =>
                setCurrentGames(games)
              );
              setError("something went wrong, please try again");
            });
        }}
      >
        <label for="game_name">Game Title</label>
        <input
          name="game_name"
          onChange={(e) =>
            setGame((currentGame) => {
              const temp = { ...currentGame };
              temp.game_name = e.target.value;
              return temp;
            })
          }
        />
        <br />
        <label htmlFor="category">Game Category</label>
        <select
          id="category"
          value={game.category_id}
          onChange={(e) =>
            setGame((currentGame) => {
              const temp = { ...currentGame };
              temp.category_id = e.target.value;
              return temp;
            })
          }
        >
          <option key="1" value="1">
            Strategy
          </option>
          <option key="2" value="2">
            Hidden Roles
          </option>
          <option key="3" value="3">
            Dexterity
          </option>
          <option key="4" value="4">
            Push Your Luck
          </option>
          <option key="5" value="5">
            Roll and Write
          </option>
          <option key="6" value="6">
            Deck Building
          </option>
          <option key="7" value="7">
            Engine Building
          </option>
          <option key="8" value="8">
            Party
          </option>
          <option key="9" value="9">
            Co-op
          </option>
        </select>
        <button
          className="addGame"
          type="submit"
          disabled={game.game_name.length < 2}
        >
          Add
        </button>
      </form>
    </div>
  );
};
