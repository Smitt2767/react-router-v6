import React, { createContext, useState } from "react";

export const authCtx = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  const setAuthUser = (value) => {
    setUser(value);
    localStorage.setItem("user", JSON.stringify(value));
  };

  return (
    <authCtx.Provider
      value={{
        user,
        setUser: setAuthUser,
      }}
    >
      {children}
    </authCtx.Provider>
  );
};

export default AuthProvider;
