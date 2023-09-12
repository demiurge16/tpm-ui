import axios from "axios";
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

const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: "login-required",
  flow: "standard"
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
}

const defaultAuthContextValues: AuthContextValues = {
  isAuthenticated: false,
  logout: () => {},
  userId: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  roles: [],
  hasRole: (role: Role) => false
};

export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextValues
);

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

  useEffect(() => {
    keycloak.init(keycloakInitOptions)
      .then((authenticated) => {
        if (!authenticated) {
          keycloak.login();
        }

        setAuthenticated(authenticated);
        setUserId(keycloak.tokenParsed?.sub || "");
        setUsername(keycloak.tokenParsed?.preferred_username);
        setFirstName(keycloak.tokenParsed?.given_name);
        setLastName(keycloak.tokenParsed?.family_name);
        setEmail(keycloak.tokenParsed?.email);
        setRoles(keycloak.tokenParsed?.realm_access?.roles as Array<Role> || []);

        axios.interceptors.request.use(
          (config) => {
            config.headers ??= {};
            config.headers["Authorization"] = `Bearer ${keycloak.token}`;
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );

        axios.interceptors.response.use(
          (response) => response,
          (error) => {
            if (error.response === undefined) {
              return Promise.reject(error);
            }
            if (error.response.status === 401) {
              return keycloak.updateToken(5)
                .then((result) => {
                  if (result === true) {
                    return axios({ ...error.config });
                  } else {
                    return Promise.reject(new Error("Unauthorized"));
                  }
                })
                .catch((error) => {
                  keycloak.logout();
                  return Promise.reject(error);
                });
            }
            return Promise.reject(error);
          },
        );

        setInitialized(true);
      })
      .catch((error) => {
        setAuthenticated(false);
        setInitialized(true);
      });
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, userId, username, firstName, lastName, email, roles, hasRole }}>
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
