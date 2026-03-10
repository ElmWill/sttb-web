import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface AuthorizeProps {
  children: ReactNode;
}

export const Authorize = ({ children }: AuthorizeProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/api/auth/signin"); // Or specific login page
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-8 text-center text-muted-foreground">Loading authentication...</div>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
};
