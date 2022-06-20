import React from "react";
import { Link } from "react-router-dom";

const Customer = () => {
  return (
    <div>
      <p>Customer</p>
      <Link to="cart">Cart</Link>
    </div>
  );
};

export default Customer;
