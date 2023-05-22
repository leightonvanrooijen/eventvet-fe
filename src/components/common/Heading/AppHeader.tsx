"use client";

import { Typography } from "../../../componentLibrary/components/atoms/Text/Typography";
import { Button } from "../../../componentLibrary/components/atoms/Button/Button";
import React from "react";
import styled from "styled-components";

const StyledHeading = styled("div")`
  z-index: 2;
  height: 4rem;
  display: flex;
  padding: 0.5rem 1rem;
  box-shadow: ${({ theme }) => theme.lighting.headingShadow};
  background-color: ${({ theme }) => theme.color.menuFill}};
`;

export const AppHeader = () => {
  return (
    <StyledHeading>
      <Typography variant={"headingLarge"}>Event Vet</Typography>
      <div
        style={{
          display: "flex",
          marginLeft: "3rem",
        }}
      >
        <Button variant="Text" onClick={() => {}}>
          Procedure
        </Button>
        <Button variant="Text" onClick={() => {}}>
          Invoice
        </Button>
      </div>
    </StyledHeading>
  );
};

const StyledErrorContainer = styled("div")`
  position: fixed;
  height: 100%;
  max-width: 400px;
`;

export const ErrorContainer = () => {};
