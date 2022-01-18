import React from "react";
import { useSelector } from "react-redux";

const SuccessPayment = () => {
  const { firstName, email } = useSelector((state) => {
    return {
      firstName: state.auth.firstName,
      email: state.auth.email,
    };
  });
  return (
    <div>
      <div>
        <h3>
          Thank You {firstName}! Your Payment was Successful. A confirmation
          email has been sent to {email}
        </h3>
        <h5>Order Details</h5>
      </div>
    </div>
  );
};

export default SuccessPayment;
