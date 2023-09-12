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
  const { isAuthenticated, hasRole } = useAuth();

  return isAuthenticated
    ? roles && roles.some(hasRole) ? <>{children}</> : <Navigate to="/forbidden" />
    : <LoadingScreen />;
};
