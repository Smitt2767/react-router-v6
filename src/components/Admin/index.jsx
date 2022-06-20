import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <p>Admin</p>
      <Link to="users">users</Link> &nbsp;
      <Link to="settings">settings</Link>
    </div>
  );
};

export default Admin;
