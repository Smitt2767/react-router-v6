import { useContext } from "react";
import { authCtx } from "../context/authContext";

const useAuth = () => {
  return useContext(authCtx);
};

export default useAuth;
