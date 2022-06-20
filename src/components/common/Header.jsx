import React from "react";
import styled from "styled-components";
import { Container } from "./common";
import { NavLink as ReactRouterNavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { roles } from "../../constants";

const Nav = styled.nav`
  height: 50px;
  background-color: rgb(40, 40, 40);
  color: #fff;
  padding: 0 2rem;
  display: flex;
  align-items: center;
`;

const Logo = styled.h2`
  display: inline-block;
  cursor: pointer;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(ReactRouterNavLink)`
  color: #c0bfbf;
  text-decoration: none;
  &.active {
    color: #fff;
  }
  &:hover {
    color: #fff;
  }
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  text-transform: uppercase;
  color: #c0bfbf;
  &:hover {
    color: #fff;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogoClick = () => {
    navigate("/");
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Nav>
      <Container>
        <NavContainer>
          <Logo onClick={handleLogoClick}>Router V6</Logo>
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            {!!user && (
              <>
                {user.role === roles.customer && (
                  <NavLink to="/customer">Customer</NavLink>
                )}
                {user.role === roles.admin && (
                  <NavLink to="/admin">Admin</NavLink>
                )}
                <NavLink to="/profile">Profile</NavLink>
              </>
            )}
            <NavLink to="/about">About</NavLink>
            {!!!user ? (
              <NavLink to="/login">Login</NavLink>
            ) : (
              <Button onClick={logout}>Logout</Button>
            )}
          </NavLinks>
        </NavContainer>
      </Container>
    </Nav>
  );
};

export default Header;
