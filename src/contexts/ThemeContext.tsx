import { createContext, useState } from "react";

export type Theme = "light" | "dark";

interface ThemeContextValues {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const defaultThemeContextValues: ThemeContextValues = {
  theme: "dark",
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextValues>(
  defaultThemeContextValues
);

interface ThemeContextProviderProps {
  children: JSX.Element;
}

const ThemeContextProvider = (
  props: ThemeContextProviderProps
) => {
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
