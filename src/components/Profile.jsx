import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../api";

const Profile = ({ user, isAuthenticated, isAuth0Loading }) => {
  const [dataUser, setDataUser] = useState({});

  console.log(user);

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
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.nickname}</h2>
      <p>{user.email}</p>
      <Link to={`update-profile/${user.nickname}`}>
        <button>Update Profile</button>
      </Link>
    </div>
  ) : null;
};

export default Profile;
