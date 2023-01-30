import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../api";

const Profile = ({ user, isAuthenticated, isAuth0Loading }) => {
  const [dataUser, setDataUser] = useState({});


  // useEffect(() => {
  //   getUser(user.nickname).then((userProfile) => {
  //     setDataUser(userProfile);
  //     console.log(dataUser, "<- dataUser");
  //   });
  // }, []);

  if (isAuth0Loading) {
    return <div>Loading ...</div>;
  }
  return isAuthenticated ? (
    <div className="profile">
      <img className="profile__image" src={user.picture} alt={user.name} />
      <h2 className="profile__username">{user.nickname}</h2>
      <p className="profile__email">{user.email}</p>
      <Link className="profile__updateProfile" to={`update-profile/${user.nickname}`}>
        <button className="profile__updateProfile__button">Update Profile</button>
      </Link>
    </div>
  ) : null;
};

export default Profile;
