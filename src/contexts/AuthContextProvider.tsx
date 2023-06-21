import axios from "axios";
import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";
import { createContext, useState, useEffect } from "react";

const keycloakConfig: KeycloakConfig = {
  realm: "tpm",
  clientId: "tpm-frontend",
  url: "http://auth.tpm.localhost",
};

const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: "login-required",
  flow: "standard"
};

const keycloak = new Keycloak(keycloakConfig);

interface AuthContextValues {
  isAuthenticated: boolean;
  logout: () => void;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

const defaultAuthContextValues: AuthContextValues = {
  isAuthenticated: false,
  logout: () => {},
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  roles: [],
};

export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextValues
);

interface AuthContextProviderProps {
  children: JSX.Element;
}

const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    keycloak.init(keycloakInitOptions)
      .then((authenticated) => {
        if (!authenticated) {
          keycloak.login();
        }

        setAuthenticated(authenticated);

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
          (response) => {
            return response;
          },
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
      })
      .catch((error) => {
        setAuthenticated(false);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setUsername(keycloak.tokenParsed?.preferred_username);
      setFirstName(keycloak.tokenParsed?.given_name);
      setLastName(keycloak.tokenParsed?.family_name);
      setEmail(keycloak.tokenParsed?.email);
      setRoles(keycloak.tokenParsed?.realm_access?.roles || []);
    }
  }, [isAuthenticated]);

  const logout = () => {
    keycloak.logout();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, username, firstName, lastName, email, roles }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
