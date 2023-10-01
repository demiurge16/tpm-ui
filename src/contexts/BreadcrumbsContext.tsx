import { createContext, useContext, useEffect, useState } from "react";

interface Breadcrumb {
  label: string;
  path: string;
}

interface BreadcrumbsContextValues {
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
}

const defaultBreadcrumbsContextValues: BreadcrumbsContextValues = {
  breadcrumbs: [],
  setBreadcrumbs: () => {},
};

export const BreadcrumbsContext = createContext<BreadcrumbsContextValues>(
  defaultBreadcrumbsContextValues
);

interface BreadcrumbsContextProviderProps {
  children: JSX.Element;
}

const BreadcrumbsContextProvider = (
  props: BreadcrumbsContextProviderProps
) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  return (
    <BreadcrumbsContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
      }}
    >
      {props.children}
    </BreadcrumbsContext.Provider>
  );
}

export default BreadcrumbsContextProvider;

export const useBreadcrumbsContext = () => {
  const context = useContext(BreadcrumbsContext);

  if (!context) {
    throw new Error("useBreadcrumbsContext must be used within a BreadcrumbsContextProvider");
  }

  return context;
}
