import React, { useEffect, useState } from "react";
import { getUser, patchUser, postUser } from "../api";
import "../index.css";

const UpdateProfile = ({ user }) => {
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
    distance_radius: ""
  });
  const [dbUser, setDbUser] = useState({});
  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState("");

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
        setIsLoading(false)
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
          setIsLoading(false)
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
          setIsLoading(false)
        });
    }
  };

  return (
    <main className="UpdateProfile">
      <h1 className="profile__header">{userExists ? "Update" : "Create"} Your Profile</h1>
      <div className="profile__container">
        <img className="profile__img" src={user.picture} alt={user.username} />

        {!isLoading && (
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className="profile__form__label">Username:</label>
            <input name="username" value={user.nickname} disabled={true} />

            <label className="profile__form__label">First Name:</label>
            <input
              onChange={(e) => {
                setUpdatedUser((currentUser) => {
                  const temp = {...currentUser}
                  temp.first_name = e.target.value;
                  return temp;
                });
              }}
              name="first_name"
              value={updatedUser.first_name}
            />
            <label className="profile__form__label">
              Last Name:</label>
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {... currentUser}
                    temp.last_name = e.target.value;
                    return temp;
                  });
                }}
                name="last_name"
                value={updatedUser.last_name}
              />
            
            <label className="profile__form__label">
              Avatar URL:</label>
              <input
                name="avatar_url"
                value={updatedUser.avatar_url}
                defaultValue={user.picture}
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {...currentUser}
                    temp.avatar_url = e.target.value;
                    return temp;
                  });
                }}
              />
        
            <label className="profile__form__label">
              Email:</label>
              <input
                name="email"
                value={updatedUser.email}
                defaultValue={user.email}
                disabled={userExists}
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {...currentUser}
                    temp.email = e.target.value;
                    return temp;
                  });
                }}
              />
            
            <label className="profile__form__label">
              Contact Number:</label>
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {...currentUser}
                    temp.phone_number = e.target.value;
                    return temp;
                  });
                }}
                name="phone_number"
                value={updatedUser.phone_number}
              />
          
            <label className="profile__form__label">
              Date of Birth:</label>
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {...currentUser}
                    temp.dob = e.target.value;
                    return temp;
                  });
                }}
                name="dob"
                value={updatedUser.dob}
                disabled={userExists}
              />
            
            <label className="profile__form__label">
              Street Address:</label>
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {...currentUser}
                    temp.street_address = e.target.value;
                    return temp;
                  });
                }}
                name="street_address"
                value={updatedUser.street_address}
              />
            
            <label className="profile__form__label">
              City:{" "}</label>
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {...currentUser}
                    temp.city = e.target.value;
                    return temp;
                  });
                }}
                name="city"
                value={updatedUser.city}
              />
            
            <label className="profile__form__label">
              Postcode{" "}</label>
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {...currentUser}
                    temp.postcode = e.target.value;
                    return temp;
                  });
                }}
                name="postcode"
                value={updatedUser.postcode}
              />
            
            <label className="profile__form__label">
              County:{" "}</label>
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {...currentUser}
                    temp.county = e.target.value;
                    return temp;
                  });
                }}
                name="county"
                value={updatedUser.county}
              />
            
            <label className="profile__form__label">
              Country:</label>
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {...currentUser}
                    temp.country = e.target.value;
                    return temp;
                  });
                }}
                name="country"
                value={updatedUser.country}
              />
            
            <label className="profile__form__label">
              Distance Radius:</label>
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {...currentUser}
                    temp.distance_radius = e.target.value;
                    return temp;
                  });
                }}
                name="distance_radius"
                value={updatedUser.distance_radius}
              />
            
            <br></br>
            <button className="profile__form__submit" type="submit">Submit information</button>
          </form>
        )}
        {isLoading && <p className="loading">submitting data..please wait</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </main>
  );
};

export default UpdateProfile;
