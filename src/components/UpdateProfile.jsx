import React, { useEffect, useState } from "react";
import { getUser, patchUser, postUser } from "../api";
import "../index.css";
import PostGames from "./PostGames";

const UpdateProfile = ({ user, dbUser, setDbUser }) => {
  const [isLoading, setIsLoading] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: user.nickname,
    first_name: "",
    avatar_url: user.picture,
    last_name: "",
    phone_number: "",
    street_address: "",
    city: "",
    postcode: "",
    county: "",
    country: "",
    dob: "",
    email: user.email,
    distance_radius: "",
  });
  const [age, setAge] = useState(0);
  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState("");

  const [currentGames, setCurrentGames] = useState([]);

  useEffect(() => {
    if (updatedUser.dob) {
      setAge(() => {
        const epochDob = new Date(updatedUser.dob).getTime();
        const epochAge = Date.now() - epochDob;
        const ageInYears = Math.floor(epochAge / 31557600000);
        return ageInYears;
      });
    }
  }, [updatedUser]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (userExists) {
      patchUser(updatedUser)
        .then((newUser) => {
          setUpdatedUser(newUser);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.msg);
          setIsLoading(false);
        });
    } else {
      postUser(updatedUser)
        .then((newUser) => {
          setUpdatedUser(newUser);
          setUserExists(true);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.msg);
          setIsLoading(false);
        });
    }
  };

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
        <ul className="currentGames_list">
          {currentGames.map((game) => {
            return (
              <li key={game.user_game_id}>
                <p>Title: {game.game_name}</p>
                <p className="category__slug">
                  Category: {game.category_slug.replaceAll("-", " ")}
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
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className="profile__form__label">
              Username: {user.nickname}
            </label>
            <br />
            <label className="profile__form__label">Email: {user.email}</label>
            <br />
            {userExists && (
              <div>
                <label className="profile__form__label">
                  Date of Birth: {dbUser.dob}
                </label>
                <br />
              </div>
            )}
            <br />
            <label htmlFor="first_name" className="profile__form__label">
              First Name: *
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = { ...currentUser };
                    temp.first_name = e.target.value;
                    return temp;
                  });
                }}
                id="first_name"
                name="first_name"
                placeholder={dbUser.first_name}
                value={updatedUser.first_name}
              />
            </label>
            <br />
            <label className="profile__form__label">
              Last Name: *
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = { ...currentUser };
                    temp.last_name = e.target.value;
                    return temp;
                  });
                }}
                name="last_name"
                placeholder={dbUser.last_name}
                value={updatedUser.last_name}
              />
            </label>
            <br />
            {!userExists && (
              <div>
                <label className="profile__form__label">
                  Date of Birth: **
                </label>
                <input
                  type="date"
                  onChange={(e) => {
                    setUpdatedUser((currentUser) => {
                      const temp = { ...currentUser };
                      temp.dob = e.target.value;
                      return temp;
                    });
                  }}
                  name="dob"
                  placeholder={dbUser.dob}
                  value={updatedUser.dob}
                />
                <br />
              </div>
            )}
            <label className="profile__form__label">Avatar URL:</label>
            <input
              name="avatar_url"
              value={updatedUser.avatar_url}
              defaultValue={user.picture}
              onChange={(e) => {
                setUpdatedUser((currentUser) => {
                  const temp = { ...currentUser };
                  temp.avatar_url = e.target.value;
                  return temp;
                });
              }}
            />
            <br />
            <label className="profile__form__label">Contact Number: *</label>
            <input
              onChange={(e) => {
                setUpdatedUser((currentUser) => {
                  const temp = { ...currentUser };
                  temp.phone_number = e.target.value;
                  return temp;
                });
              }}
              name="phone_number"
              placeholder={dbUser.phone_number}
              value={updatedUser.phone_number}
            />
            <br />
            <label className="profile__form__label">Street Address:</label>
            <input
              onChange={(e) => {
                setUpdatedUser((currentUser) => {
                  const temp = { ...currentUser };
                  temp.street_address = e.target.value;
                  return temp;
                });
              }}
              name="street_address"
              placeholder={dbUser.street_address}
              value={updatedUser.street_address}
            />
            <br />
            <label className="profile__form__label">City: *</label>
            <input
              onChange={(e) => {
                setUpdatedUser((currentUser) => {
                  const temp = { ...currentUser };
                  temp.city = e.target.value;
                  return temp;
                });
              }}
              name="city"
              placeholder={dbUser.city}
              value={updatedUser.city}
            />
            <br />
            <label className="profile__form__label">Postcode: </label>
            <input
              onChange={(e) => {
                setUpdatedUser((currentUser) => {
                  const temp = { ...currentUser };
                  temp.postcode = e.target.value;
                  return temp;
                });
              }}
              name="postcode"
              placeholder={dbUser.postcode}
              value={updatedUser.postcode}
            />
            <br />
            <label className="profile__form__label">County: </label>
            <input
              onChange={(e) => {
                setUpdatedUser((currentUser) => {
                  const temp = { ...currentUser };
                  temp.county = e.target.value;
                  return temp;
                });
              }}
              name="county"
              placeholder={dbUser.county}
              value={updatedUser.county}
            />
            <br />
            <label className="profile__form__label">Country: *</label>
            <input
              onChange={(e) => {
                setUpdatedUser((currentUser) => {
                  const temp = { ...currentUser };
                  temp.country = e.target.value;
                  return temp;
                });
              }}
              name="country"
              placeholder={dbUser.country}
              value={updatedUser.country}
            />
            <br />
            <label className="profile__form__label">
              Distance Radius (km):
            </label>
            <input
              onChange={(e) => {
                setUpdatedUser((currentUser) => {
                  const temp = { ...currentUser };
                  temp.distance_radius = e.target.value;
                  return temp;
                });
              }}
              name="distance_radius"
              placeholder={dbUser.distance_radius}
              value={updatedUser.distance_radius}
            />
            <br />
            <br />
            <button
              className="profile__form__submit"
              type="submit"
              disabled={!userExists && age < 18}
            >
              Submit information
            </button>
            {!userExists && age < 18 && ` Must be 18+ to use I'm Board`}
            <br />
            *: Required
          </form>
        )}
        {isLoading && <p className="loading">submitting data..please wait</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </main>
  );
};

export default UpdateProfile;
