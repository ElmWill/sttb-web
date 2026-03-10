import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (!allowedRoles.includes(user.roleName)) {
      router.push("/");
    }
  }, [user]);

  if (!user || !allowedRoles.includes(user.roleName)) {
    return null;
  }

  return <>{children}</>;
}
