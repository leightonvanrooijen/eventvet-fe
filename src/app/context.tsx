"use client";

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../componentLibrary/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { socket } from "../socket";

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [q] = React.useState(() => socket.connect());
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};
