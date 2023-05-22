import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../componentLibrary/theme";

export const MockProvider = ({
  children,
  withQuery,
  withTheme,
}: {
  children: React.ReactNode;
  withQuery?: boolean;
  withTheme?: boolean;
}) => {
  let ProvidersApplied = <>{children}</>;

  if (withQuery) {
    const queryClient = new QueryClient();
    ProvidersApplied = (
      <QueryClientProvider client={queryClient}>
        {ProvidersApplied}
      </QueryClientProvider>
    );
  }

  if (withTheme) {
    ProvidersApplied = (
      <ThemeProvider theme={defaultTheme}>{ProvidersApplied}</ThemeProvider>
    );
  }

  return ProvidersApplied;
};
