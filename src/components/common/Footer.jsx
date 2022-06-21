import React from "react";
import styled from "styled-components";
import { AiOutlineGithub } from "react-icons/ai";

const FooterContainer = styled.div`
  height: 40px;
  background-color: rgb(40, 40, 40);
  color: #fff;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.8rem;
`;

const StyledLink = styled.a`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.4rem;
  font-size: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      Router v6 &#169;{new Date().getFullYear()}
      <StyledLink
        target="_blank"
        href={"https://github.com/Smitt2767/react-router-v6"}
      >
        <AiOutlineGithub />
      </StyledLink>
    </FooterContainer>
  );
};

export default Footer;
