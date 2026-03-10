import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";

interface PermissionContextType {
  permissions: string[];
  hasPermission: (permission: string) => boolean;
  isLoading: boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch permissions from your API here
    // e.g., using `tryFetchJson` with `session.accessToken`
    // Mocking permissions for now based on session
    if (session) {
      setPermissions(["manage_users", "manage_content"]); // placeholder permissions
    } else {
      setPermissions([]);
    }
    setIsLoading(false);
  }, [session]);

  const hasPermission = (permission: string) => permissions.includes(permission);

  return (
    <PermissionContext.Provider value={{ permissions, hasPermission, isLoading }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error("usePermission must be used within a PermissionProvider");
  }
  return context;
};

// Component wrapper for permission-based rendering
export const RequirePermission = ({ 
  permission, 
  children,
  fallback = null 
}: { 
  permission: string, 
  children: ReactNode,
  fallback?: ReactNode 
}) => {
  const { hasPermission, isLoading } = usePermission();

  if (isLoading) return null;
  
  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
