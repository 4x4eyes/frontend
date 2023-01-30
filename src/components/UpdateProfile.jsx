import React, { useEffect, useState } from "react";
import { getUser, patchUser, postUser } from "../api";
import "../index.css";

const UpdateProfile = ({ user }) => {
  const [isLoading, setIsLoading] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: user.nickname,
    first_name: "",
    last_name: "",
    phone_number: "",
    street_address: "",
    city: "",
    post_code: "",
    county: "",
    country: "",
    dob: "",
    email: user.email,
  });
  const [dbUser, setDbUser] = useState({});
  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState("");

  // const userExists = () => {
  //   return user.nickname === dbUser.username;
  // };

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
    <main>
      <h1>{userExists ? "Update" : "Create"} Your Profile</h1>
      <div className="container">
        <img src={user.picture} alt={user.username} className="item" />

        {!isLoading && (
          <form onSubmit={handleSubmit} className="item">
            <label>Username:</label>
            <input name="username" value={user.nickname} disabled={true} />

            <label>First Name:</label>
            <input
              onChange={(e) => {
                setUpdatedUser((currentUser) => {
                  currentUser.first_name = e.target.value;
                  return currentUser;
                });
              }}
              name="first_name"
              value={updatedUser.first_name}
            />
            <label>
              Last Name:
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    currentUser.last_name = e.target.value;
                    return currentUser;
                  });
                }}
                name="last_name"
                value={updatedUser.last_name}
              />
            </label>
            <label>
              Email:
              <input
                name="email"
                value={updatedUser.email}
                defaultValue={user.email}
                disabled={true}
              />
            </label>
            <label>
              Contact Number:
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    currentUser.phone_number = e.target.value;
                    return currentUser;
                  });
                }}
                name="phone_number"
                value={updatedUser.phone_number}
              />
            </label>
            <label>
              Date of Birth:
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    currentUser.dob = e.target.value;
                    return currentUser;
                  });
                }}
                name="dob"
                value={updatedUser.dob}
                disabled={userExists}
              />
            </label>
            <label>
              Street Address:
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    currentUser.street_address = e.target.value;
                    return currentUser;
                  });
                }}
                name="street_address"
                value={updatedUser.street_address}
              />
            </label>
            <label>
              City:{" "}
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    currentUser.city = e.target.value;
                    return currentUser;
                  });
                }}
                name="city"
                value={updatedUser.city}
              />
            </label>
            <label>
              Postcode{" "}
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    currentUser.post_code = e.target.value;
                    return currentUser;
                  });
                }}
                name="postcode"
                value={updatedUser.postcode}
              />
            </label>
            <label>
              County:{" "}
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    currentUser.county = e.target.value;
                    return currentUser;
                  });
                }}
                name="county"
                value={updatedUser.county}
              />
            </label>
            <label>
              Country:
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    currentUser.country = e.target.value;
                    return currentUser;
                  });
                }}
                name="country"
                value={updatedUser.country}
              />
            </label>
            <br></br>
            <button type="submit">Submit information</button>
          </form>
        )}
        {isLoading && <p>submitting data..please wait</p>}
        {error && <p>{error}</p>}
      </div>
    </main>
  );
};

export default UpdateProfile;
