import { createContext, useContext, useEffect, useState } from "react";
import TpmClient from "../client/TpmClient";
import axios from "axios";
import { LoadingScreen } from "../pages/utils/LoadingScreen";

interface TpmClientContextValues {
  tpmClient: TpmClient;
}

const defaultTpmClientContextValues: TpmClientContextValues = {
  tpmClient: TpmClient.getInstance(),
};

export const TpmClientContext = createContext<TpmClientContextValues>(
  defaultTpmClientContextValues
);

interface TpmClientContextProviderProps {
  children: JSX.Element;
}

const TpmClientContextProvider = (
  props: TpmClientContextProviderProps
) => {
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return Promise.resolve(response);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    setInitialized(true);
  }, []);

  return (
    <TpmClientContext.Provider value={{ tpmClient: TpmClient.getInstance() }}>
      {initialized ? props.children : <LoadingScreen />}
    </TpmClientContext.Provider>
  );
}

export default TpmClientContextProvider;

export const useTpmClient = () => {
  const { tpmClient } = useContext(TpmClientContext);
  return tpmClient;
}