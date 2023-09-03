import { AuthContext, Role } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../../pages/utils/LoadingScreen";

export interface SecuredRouteProps {
  roles?: Role[];
  children: React.ReactNode;
}

export const SecuredRoute = (props: SecuredRouteProps) => {
  const { roles, children } = props;
  const authContext = useContext(AuthContext);

  return authContext.isAuthenticated
    ? roles && roles.some(authContext.hasRole) ? <>{children}</> : <Navigate to="/forbidden" />
    : <LoadingScreen />;
};
