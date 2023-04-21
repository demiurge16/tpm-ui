import { AuthContext } from "../../contexts/AuthContextProvider";
import { useContext } from "react";
import { Utils } from "../../pages/utils/Utils";

export interface SecuredRouteProps {
  children: React.ReactNode;
}

export const SecuredRoute = (props: SecuredRouteProps) => {
  const { children } = props;
  const authContext = useContext(AuthContext);

  const isLoggedIn = authContext?.isAuthenticated;

  return isLoggedIn
    ? <>{children}</>
    : <Utils.LoadingScreen/>;
};
