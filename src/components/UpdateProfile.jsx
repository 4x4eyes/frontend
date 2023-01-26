import React from "react";

const UpdateProfile = ({ user }) => {
  console.log(user);
  return (
    <main>
      <h1>Update Your Profile</h1>

      <img src={user.picture} alt={user.username} />
      <br />
      <label>
        Username: <input name="usernameInput" value={user.nickname} />
      </label>
      <br />
      <label>
        First Name: <input name="firstNameInput" value={user.first_name} />
      </label>
      <br />
      <label>
        Last Name: <input name="lastNameInput" value={user.last_name} />
      </label>
      <br />
      <label>
        Email: <input name="emailInput" value={user.email} />
      </label>
      <br />
      <label>
        Contact Number:{" "}
        <input name="contactNumberInput" value={user.phone_number} />
      </label>
      <br />
      <label>
        Date of Birth: <input name="DOBInput" value={user.dob} />
      </label>
      <br />
      <label>
        Street Address:{" "}
        <input name="streetAddressInput" value={user.street_address} />
      </label>
      <label>
        <br />
        City: <input name="cityInput" value={user.city} />
      </label>
      <br />
      <label>
        Postcode <input name="postcodeInput" value={user.postcode} />
      </label>
      <br />
      <label>
        County: <input name="countyInput" value={user.county} />
      </label>
      <br />
      <label>
        Country:
        <input name="countryInput" value={user.country} />
      </label>
    </main>
  );
};

export default UpdateProfile;
