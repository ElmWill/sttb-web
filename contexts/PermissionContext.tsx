import React, { createContext, useContext, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { RoleName, RoleNames } from "@/constants/Permissions";

interface PermissionContextType {
  permissions: string[];
  roleName: string;
  hasPermission: (permission: string) => boolean;
  isRole: (role: RoleName | RoleName[]) => boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();

  const permissions = user?.permissions ?? [];
  const roleName = user?.roleName ?? "";

  const hasPermission = (permission: string) => permissions.includes(permission);

  const isRole = (role: RoleName | RoleName[]) => {
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(roleName as RoleName);
  };

  // Convenience: any admin-level role can manage all content 
  const isAdmin = isRole([RoleNames.SuperAdmin, RoleNames.Admin]);

  return (
    <PermissionContext.Provider value={{ permissions, roleName, hasPermission, isRole, isAdmin, isLoading }}>
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

/**
 * Renders children only if the user has ALL the given permissions.
 * If fallback is provided, renders that instead when the check fails.
 */
export const RequirePermission = ({
  permission,
  children,
  fallback = null,
}: {
  permission: string | string[];
  children: ReactNode;
  fallback?: ReactNode;
}) => {
  const { hasPermission, isLoading } = usePermission();
  if (isLoading) return null;

  const perms = Array.isArray(permission) ? permission : [permission];
  const allowed = perms.every(hasPermission);

  return <>{allowed ? children : fallback}</>;
};

/**
 * Renders children only if the user has the given role(s).
 */
export const RequireRole = ({
  role,
  children,
  fallback = null,
}: {
  role: RoleName | RoleName[];
  children: ReactNode;
  fallback?: ReactNode;
}) => {
  const { isRole, isLoading } = usePermission();
  if (isLoading) return null;
  return <>{isRole(role) ? children : fallback}</>;
};

