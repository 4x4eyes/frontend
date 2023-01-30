import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../api";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Profile = ({ user, isAuthenticated, isAuth0Loading }) => {
  const [dataUser, setDataUser] = useState({});

  if (isAuth0Loading) {
    return <div>Loading ...</div>;
  }
  return isAuthenticated ? (
    <div className="profile">
       <LogoutButton />
      <img className="profile__image" src={user.picture} alt={user.name} />
      <h2 className="profile__username">{user.nickname}</h2>
      <Link className="profile__updateProfile" to={`update-profile/${user.nickname}`}>
        <button className="profile__updateProfile__button">Update Profile</button>
      </Link>
    </div>
  ) : <LoginButton />;
};

export default Profile;
