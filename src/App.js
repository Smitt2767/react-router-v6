import React from "react";

import { createGlobalStyle } from "styled-components";

import AuthProvider from "./context/authContext";
import Routes from "./routes";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};

export default App;
