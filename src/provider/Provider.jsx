"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCLient = new QueryClient();

const Provider = ({ children }) => {
  return (
    <QueryClientProvider client={queryCLient}>{children}</QueryClientProvider>
  );
};

export default Provider;