import React, { useEffect, useState } from "react";
import { getUser, patchUser, postUser } from "../api";
import "../index.css";

const UpdateProfile = ({ user }) => {
  const [isLoading, setIsLoading] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const [dbUser, setDbUser] = useState({});
  const userExists = () => {
    return user.nickname === dbUser.username;
  };
  useEffect(() => {
    setIsLoading(true);
    getUser(user.nickname).then((dbUser) => {
      setDbUser(dbUser);
    });
    setIsLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    setUpdatedUser(formData);
    if (userExists) {
      setIsLoading(true);
      patchUser(user.nickname, updatedUser)
    } else {
      setIsLoading(true);
      postUser(updatedUser);
    }
    setIsLoading(false);
  };

  return (
    <main>
      <h1>{userExists ? "Update" : "Create"} Your Profile</h1>
      <div className="container">
        <img src={user.picture} alt={user.username} className="item" />

        {!isLoading && (
          <form onSubmit={handleSubmit} className="item">
            <label>Username:</label>
            <input
              name="username"
              value={user.nickname}
              disabled={userExists()}
            />

            <label>First Name:</label>
            <input name="first_name" value={user.first_name} />
            <label>
              Last Name:
              <input name="last_name" value={user.last_name} />
            </label>
            <label>
              Email:
              <input name="email" value={user.email} disabled={userExists()} />
            </label>
            <label>
              Contact Number:
              <input name="phone_number" value={user.phone_number} />
            </label>
            <label>
              Date of Birth:
              <input name="dob" value={user.dob} disabled={userExists()} />
            </label>
            <label>
              Street Address:
              <input name="street_address" value={user.street_address} />
            </label>
            <label>
              City: <input name="city" value={user.city} />
            </label>
            <label>
              Postcode <input name="postcode" value={user.postcode} />
            </label>
            <label>
              County: <input name="county" value={user.county} />
            </label>
            <label>
              Country:
              <input name="country" value={user.country} />
            </label>
            <br></br>
            <button type="submit">Submit information</button>
          </form>
        )}
        {isLoading && <p>submitting data..please wait</p>}
      </div>
    </main>
  );
};

export default UpdateProfile;
