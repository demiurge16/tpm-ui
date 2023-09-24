import { ReactNode } from "react";
import { Role, useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../../pages/utils/LoadingScreen";

export interface SecuredRouteProps {
  roles?: Role[];
  children: ReactNode;
}

export const SecuredRoute = (props: SecuredRouteProps) => {
  const { roles, children } = props;
  const { isAuthenticated, hasAnyRole } = useAuth();

  return isAuthenticated
    ? roles && hasAnyRole(roles) ? <>{children}</> : <Navigate to="/forbidden" />
    : <LoadingScreen />;
};
