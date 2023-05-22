"use client";
import React, { useEffect } from "react";
import { Sidebar } from "../../components/common/SideBar/Sidebar";
import styled from "styled-components";
import { socket } from "../../socket";
import { useQueryClient } from "@tanstack/react-query";

const StyledPageWrapper = styled("div")`
  overflow: auto;
  flex: 1;
  display: flex;
`;

const ScreenContainer = styled("div")`
  display: flex;
  flex: 1;
  padding: 2rem;
`;

const ScreenBorder = styled("div")`
  display: flex;
  flex: 1;
  padding: 1rem;

  border-radius: ${({ theme }) => theme.border.radius400};
  background-color: ${({ theme }) => theme.color.menuFill};
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onProcedureUpdated = (id: string) => {
      queryClient.invalidateQueries(["procedures"]);
      queryClient.invalidateQueries(["procedure", id]);
    };

    socket.on("procedure updated", onProcedureUpdated);

    return () => {
      socket.off("procedure updated", onProcedureUpdated);
    };
  }, [queryClient]);

  return (
    <StyledPageWrapper>
      <Sidebar />
      <ScreenContainer>
        <ScreenBorder>{children}</ScreenBorder>
      </ScreenContainer>
    </StyledPageWrapper>
  );
}
