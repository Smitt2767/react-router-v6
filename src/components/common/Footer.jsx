import React from "react";
import styled from "styled-components";

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

const Footer = () => {
  return (
    <FooterContainer>
      Router v6 &#169;{new Date().getFullYear()}
    </FooterContainer>
  );
};

export default Footer;
