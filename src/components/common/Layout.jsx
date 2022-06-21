import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const Body = styled.div`
  min-height: calc(100vh - 90px);
  position: relative;
`;

const Layout = () => {
  return (
    <>
      <Header />
      <Body>
        <Outlet />
      </Body>
      <Footer />
    </>
  );
};

export default Layout;
