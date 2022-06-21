import React from "react";

import styled, { css, keyframes } from "styled-components";

const pulse = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.4);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

const OuterDiv = styled.div`
  height: 100vh;

  & div:not(:last-child) {
    margin-right: 5px;
  }
`;

const InnerDiv = styled.div`
  height: 20px;
  width: 20px;
  background-color: #282828;
  border-radius: 15px;
  display: inline-block;
  ${({ delay }) => css`
    animation: ${pulse} 0.75s ${delay}s infinite;
  `}
`;

const Loader = () => {
  return (
    <OuterDiv>
      <InnerDiv delay={0.2} />
      <InnerDiv delay={0.4} />
      <InnerDiv delay={0.6} />
    </OuterDiv>
  );
};

export default Loader;
