import { createContext, useContext } from "react";
import TpmClient from "../client/TpmClient";

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
  return (
    <TpmClientContext.Provider
      value={{
        tpmClient: TpmClient.getInstance(),
      }}
    >
      {props.children}
    </TpmClientContext.Provider>
  );
}

export default TpmClientContextProvider;

export const useTpmClient = () => {
  const { tpmClient } = useContext(TpmClientContext);
  return tpmClient;
}