"use client";
import React from "react";
import styled from "styled-components";
import { MenuItem } from "../../../componentLibrary/components/atoms/MenuItem/MenuItem";
import { Typography } from "../../../componentLibrary/components/atoms/Text/Typography";
import Link from "next/link";

export const StyledSidebar = styled("div")`
  height: 100%;
  width: 200px;
  border-radius: 0.25rem;

  background-color: ${({ theme }) => theme.color.menuFill};
  box-shadow: ${({ theme }) => theme.lighting.sideBarShadow};
`;

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <div style={{ padding: "1rem 0.625rem 0.5rem 0.625rem" }}>
        <Typography variant={"headingMedium"}>Procedure</Typography>
      </div>
      <Link href={"/procedure/create"}>
        <MenuItem>Create</MenuItem>
      </Link>
      <Link href={"/procedure"}>
        <MenuItem>Preform</MenuItem>
      </Link>
    </StyledSidebar>
  );
};
