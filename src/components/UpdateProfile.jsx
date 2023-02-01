import React, { useEffect, useState } from "react";
import { getUser } from "../api";
import PostGames from "./PostGames";
import ProfileForm from "./ProfileForm";

import "./UpdateProfile.css";

const UpdateProfile = ({ user, dbUser, setDbUser }) => {
  const [isLoading, setIsLoading] = useState(null);

  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState("");

  const [currentGames, setCurrentGames] = useState([]);

  useEffect(() => {
    setError("");
    setIsLoading(true);
    getUser(user.nickname)
      .then((result) => {
        setDbUser(result);
        setUserExists(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setUserExists(false);
        setIsLoading(false);
        setError(err.msg);
      });
  }, []);

  return (
    <main className="UpdateProfile">
      <h1 className="profile__header">
        {userExists ? "Update" : "Create"} Your Profile
      </h1>
      {userExists ? null : (
        <p>
          In order to access the site, please complete your profile and submit.
          Once done you can view your matches and access the messaging system.
        </p>
      )}
      {userExists && (
        <div>
          <PostGames
            user={user}
            setCurrentGames={setCurrentGames}
            setError={setError}
          />
          <br></br>
        </div>
      )}

      <div className="currentGames">
        <h4>Favourite Games</h4>
        <ul className="currentGames_list">
          {currentGames.map((game) => {
            return (
              <li className="game__card" key={game.user_game_id}>
                <p className="category__slug">
                  <b>Game:</b> {game.game_name} | <b>Category:</b>{" "}
                  {game.category_slug.replaceAll("-", " ")}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="profile__container">
        <img
          className="profile__img"
          src={dbUser.avatar_url}
          alt={user.username}
        />

        {!isLoading && (
          <div>
            <div className="profile__form__static">
              <label>Username: {user.nickname}</label>
              <br />
              <label>Email: {user.email}</label>
              <br />
              {userExists && (
                <div>
                  <label>Date of Birth: {dbUser.dob}</label>
                  <br />
                </div>
              )}
              <br />
            </div>
            <ProfileForm
              setError={setError}
              setIsLoading={setIsLoading}
              setUserExists={setUserExists}
              userExists={userExists}
              user={user}
              dbUser={dbUser}
            />
          </div>
        )}
        {isLoading && <p className="loading">submitting data..please wait</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </main>
  );
};

export default UpdateProfile;
