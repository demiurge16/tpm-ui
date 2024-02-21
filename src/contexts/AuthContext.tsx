import axios, { AxiosError } from "axios";
import { useContext } from "react";
import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";
import { createContext, useState, useEffect } from "react";
import { environment } from "../Environment";
import { LoadingScreen } from "../pages/utils/LoadingScreen";

const keycloakConfig: KeycloakConfig = {
  realm: "tpm",
  clientId: "tpm-frontend",
  url: environment.authServerUrl,
};

const keycloak = new Keycloak(keycloakConfig);

export type Role = "admin"
  | "project-manager"
  | "translator"
  | "editor"
  | "proofreader"
  | "subject-matter-expert"
  | "publisher"
  | "observer"
  | "user";

interface AuthContextValues {
  isAuthenticated: boolean;
  logout: () => void;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
}

export const AuthContext = createContext<AuthContextValues>({
  isAuthenticated: false,
  logout: () => {},
  userId: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  roles: [],
  hasRole: () => false,
  hasAnyRole: () => false
});

interface AuthContextProviderProps {
  children: JSX.Element;
}

const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [initialized, setInitialized] = useState<boolean>(false);

  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roles, setRoles] = useState<Role[]>([]);

  const keycloakInitOptions: KeycloakInitOptions = {
    onLoad: "login-required",
    flow: "standard"
  };

  useEffect(() => {
    const initializeUser = (authenticated: boolean) => {
      setAuthenticated(authenticated);
      const { sub, preferred_username, given_name, family_name, email, realm_access } = keycloak.tokenParsed || {};
      setUserId(sub || "");
      setUsername(preferred_username);
      setFirstName(given_name);
      setLastName(family_name);
      setEmail(email);
      setRoles(realm_access?.roles as Array<Role> || []);
    };
  
    const setAuthorizationHeader = (config: any) => {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${keycloak.token}`;
      return config;
    };
  
    const handleResponseError = async (error: AxiosError) => {
      if (error.response?.status === 401) {
        keycloak.updateToken(5).then(refreshed => {
          if (!refreshed) {
            return Promise.reject(error);
          }

          const config = error.config;

          if (!config) {
            return Promise.reject(error);
          }

          console.log("Token refreshed");
          return axios.request(config);
        }).catch(() => {
          return Promise.reject(error);
        });
      } else {
        return Promise.reject(error);
      }
    };
  
    const initializeKeycloak = async () => {
      try {
        const authenticated = await keycloak.init(keycloakInitOptions);
        if (!authenticated) keycloak.login();
        initializeUser(authenticated);
  
        axios.interceptors.request.use(setAuthorizationHeader, error => Promise.reject(error));
        axios.interceptors.response.use(response => response, handleResponseError);
  
        setInitialized(true);
      } catch (error) {
        setAuthenticated(false);
        setInitialized(true);
      }
    };
  
    initializeKeycloak();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setUserId(keycloak.tokenParsed?.sub || "");
      setUsername(keycloak.tokenParsed?.preferred_username);
      setFirstName(keycloak.tokenParsed?.given_name);
      setLastName(keycloak.tokenParsed?.family_name);
      setEmail(keycloak.tokenParsed?.email);
      setRoles(keycloak.tokenParsed?.realm_access?.roles as Array<Role> || []);
    }
  }, [isAuthenticated]);

  const logout = () => {
    keycloak.logout();
  };

  const hasRole = (role: Role) => {
    return roles.includes(role);
  };

  const hasAnyRole = (roles: Role[]) => {
    return roles.some(role => hasRole(role));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, userId, username, firstName, lastName, email, roles, hasRole, hasAnyRole }}>
      { initialized ? props.children : <LoadingScreen /> }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
}
