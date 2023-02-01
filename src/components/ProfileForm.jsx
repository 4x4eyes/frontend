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

  const InputField = ({ userProp, display }) => {
    return (
      <div className="profile_form_field">
        <label htmlFor={userProp} className="profile__form__label">
          {display}
        </label>
        <input
          className="profile__form__input"
          type="text"
          onChange={handleUpdatedUser(userProp)}
          id={userProp}
          name={userProp}
          placeholder={dbUser[userProp]}
          value={updatedUser[userProp]}
        />
      </div>
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
        console.log(temp);
        return temp;
      });
    };
  };

  return (
    <form className="profile__form" onSubmit={handleSubmit}>
      <InputField userProp="first_name" display="Last Name:* " />
      <InputField userProp="last_name" display="Last Name:* " />
      {!userExists && (
        <div>
          <label className="profile__form__label">Date of Birth: **</label>
          <input
            type="date"
            onChange={handleUpdatedUser("dob")}
            name="dob"
            placeholder={dbUser.dob}
            value={updatedUser.dob}
          />
          <br />
        </div>
      )}
      <InputField userProp="avatar_url" display="Avatar URL: " />
      <InputField userProp="phone_number" display="Contact Number:* " />
      <InputField userProp="street_address" display="Street Address: " />
      <InputField userProp="city" display="City:* " />
      <InputField userProp="postcode" display="Postcode: " />
      <InputField userProp="county" display="County: " />
      <InputField userProp="country" display="Country:* " />
      <InputField userProp="distance_radius" display="Distance Radius (km): " />
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
  );
};
