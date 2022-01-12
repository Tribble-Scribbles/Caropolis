import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { email } = useSelector((state) => {
    return {
      email: state.auth.email,
    };
  });

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  );
};

export default Home;
