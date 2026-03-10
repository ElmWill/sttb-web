import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface AuthorizeProps {
  children: ReactNode;
}

export const Authorize = ({ children }: AuthorizeProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

