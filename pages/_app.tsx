import "../styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";

axios.defaults.baseURL = process.env.beBaseUrl;

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
