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
                  const temp = {...currentUser}
                  temp.first_name = e.target.value;
                  return temp;
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
                    const temp = {... currentUser}
                    temp.last_name = e.target.value;
                    return temp;
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
                disabled={userExists}
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {...currentUser}
                    temp.email = e.target.value;
                    return temp;
                  });
                }}
              />
            </label>
            <label>
              Contact Number:
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
            </label>
            <label>
              Date of Birth:
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
            </label>
            <label>
              Street Address:
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
            </label>
            <label>
              City:{" "}
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
            </label>
            <label>
              Postcode{" "}
              <input
                onChange={(e) => {
                  setUpdatedUser((currentUser) => {
                    const temp = {...currentUser}
                    temp.post_code = e.target.value;
                    return temp;
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
                    const temp = {...currentUser}
                    temp.county = e.target.value;
                    return temp;
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
                    const temp = {...currentUser}
                    temp.country = e.target.value;
                    return temp;
                  });
                }}
                name="country"
                value={updatedUser.country}
              />
            </label>
            <label>
              Distance Radius:
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
