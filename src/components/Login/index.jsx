import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { roles } from "../../constants";
import useAuth from "../../hooks/useAuth";

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: inherit;
  & > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Button = styled.button`
  border: 0;
  background-color: rgb(40, 40, 40);
  color: #fff;
  padding: 0.7rem 2rem;
  cursor: pointer;
  border-radius: 5px;
  text-transform: uppercase;
`;

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from;

  const handleCustomerLogin = () => {
    setUser({
      name: "Anonymous",
      role: roles.customer,
    });
    navigate(redirectTo || "/customer");
  };

  const handleAdminLogin = () => {
    setUser({
      name: "admin",
      role: roles.admin,
    });
    navigate(redirectTo || "/admin");
  };

  return (
    <LoginContainer>
      <Button onClick={handleCustomerLogin}>Login using customer</Button>
      <Button onClick={handleAdminLogin}>Login using admin</Button>
    </LoginContainer>
  );
};

export default Login;
