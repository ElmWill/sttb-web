import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { PermissionProvider } from "@/contexts/PermissionContext";
import "@/styles/globals.css";
import React from "react";

// Optional per-page layout typing
type NextPageWithLayout = AppProps["Component"] & {
  layout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.layout ?? ((page) => page);

  return (
    <SessionProvider session={session} basePath="/api/auth">
      <PermissionProvider>
        {getLayout(<Component {...pageProps} />)}
      </PermissionProvider>
    </SessionProvider>
  );
}
