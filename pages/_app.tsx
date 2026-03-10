import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import { PermissionProvider } from "@/contexts/PermissionContext";
import "@/styles/globals.css";
import React from "react";

type NextPageWithLayout = AppProps["Component"] & {
  layout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.layout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
        <PermissionProvider>
          {getLayout(<Component {...pageProps} />)}
        </PermissionProvider>
      </AuthProvider>
    </SessionProvider>
  );
}