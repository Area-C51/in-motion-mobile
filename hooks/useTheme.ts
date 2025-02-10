// useTheme hook allows global access to the theme and to modify the theme

import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeProvider";

// useTheme hook allows other components to access the current theme and the function to update it
export const useTheme = () => {
  const context = useContext(ThemeContext); // useContext hook to access ThemeContext and return its value (the current theme and the setTheme function)
  if (!context) throw new Error('useTheme must be used within ThemeProvider'); // if this hook is used outside ThemeProvider (i.e., without being wrapped in the provider), it will throw an error; ensures it’s only used in components that are descendants of ThemeProvider
  return context;
};
