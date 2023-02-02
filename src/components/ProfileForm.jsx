import { patchUser, postUser } from "../api";
import { useState, useEffect } from "react";

export default ({
  setError,
  setIsLoading,
  userExists,
  user,
  dbUser,
  setUserExists,
}) => {
  const [updatedUser, setUpdatedUser] = useState({
    username: user.nickname,
    first_name: "",
    avatar_url: "",
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

  const inputField = (userProp, display, asterisk) => {
    return (
      <tr className="profile_form_field">
        <td className="profile__form__label">{display}</td>
        <td className="profile__form__input">
          <input
            type="text"
            onChange={handleUpdatedUser(userProp)}
            id={userProp}
            name={userProp}
            placeholder={dbUser[userProp]}
            value={updatedUser[userProp]}
          />
        </td>
        {!userExists && <td>{asterisk}</td>}
      </tr>
    );
  };

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

  const handleUpdatedUser = (field) => {
    return (e) => {
      setUpdatedUser((currentUser) => {
        const temp = { ...currentUser };
        temp[field] = e.target.value;
        return temp;
      });
    };
  };

  return (
    <form className="profile__form" onSubmit={handleSubmit}>
      <table className="profile__inout__table">
        {inputField("first_name", "First Name: ", "*")}
        {inputField("last_name", "Last Name: ", "*")}
        {userExists && (
          <tr className="profile_form_field">
            <td className="profile__form__label">Date of Birth: **</td>
            <td className="profile__form__input">
              <input
                type="date"
                onChange={handleUpdatedUser("dob")}
                name="dob"
                placeholder={dbUser.dob}
                value={updatedUser.dob}
              />
            </td>
          </tr>
        )}
        {inputField("avatar_url", "Avatar URL: ")}
        {inputField("phone_number", "Contact Number: ", "*")}
        {inputField("street_address", "Street Address: ")}
        {inputField("city", "City: ", "*")}
        {inputField("postcode", "Postcode: ")}
        {inputField("county", "County: ")}
        {inputField("country", "Country: ", "*")}
        {inputField("distance_radius", "Distance Radius (km): ")}
      </table>
      <br />
      <button
        className="profile__form__submit"
        type="submit"
        disabled={!userExists && age < 18}>
        Submit information
      </button>
      {!userExists && age < 18 && ` Must be 18+ to use I'm Board`}
      <br />
      {!userExists && "*: Required "}
    </form>
  );
};
