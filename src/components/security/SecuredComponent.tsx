import { ReactNode } from "react";
import { Role, useAuth } from "../../contexts/AuthContext";

export interface SecuredComponentProps {
  roles?: Role[];
  children: ReactNode;
}

export const SecuredComponent = ({ roles, children }: SecuredComponentProps) => {
  const { hasAnyRole } = useAuth();

  return roles && hasAnyRole(roles) ? <>{children}</> : null;
}
