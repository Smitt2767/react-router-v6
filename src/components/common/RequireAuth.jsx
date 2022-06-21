import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequiredAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!!!user)
    return (
      <Navigate
        to={"/login"}
        state={{
          from: location.pathname,
        }}
        replace
      />
    );

  return <Outlet />;
};

export default RequiredAuth;
