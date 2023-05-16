import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const MockProvider = ({
  children,
  withQuery,
}: {
  children: React.ReactNode;
  withQuery?: boolean;
}) => {
  let ProvidersApplied = <>children</>;

  if (withQuery) {
    const queryClient = new QueryClient();
    ProvidersApplied = (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return ProvidersApplied;
};
