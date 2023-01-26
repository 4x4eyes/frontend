import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ user, isAuthenticated, isLoading }) => {
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log(user);
  return isAuthenticated ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.nickname}</h2>
      <p>{user.email}</p>
      <Link to="update-profile/:username">
        <button>Update Profile</button>
      </Link>
    </div>
  ) : null;
};

export default Profile;
