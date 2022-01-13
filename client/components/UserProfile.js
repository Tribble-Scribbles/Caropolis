import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { firstName, lastName, email } = useSelector((state) => {
    return {
      firstName: state.auth.firstName,
      lastName: state.auth.lastName,
      email: state.auth.email,
    };
  });

  return (
    <div>
      <div id="user-profile-info">
        <h1>Welcome {firstName}</h1>
        <h3>Past Orders</h3>
        <h3>Favorite Cars</h3>
      </div>
      <div id="account-info">
        <h3>Account Information</h3>
        <h5>{firstName}</h5>
        <h5>{lastName}</h5>
        <h5>{email}</h5>
      </div>
    </div>
  );
};

export default UserProfile;
