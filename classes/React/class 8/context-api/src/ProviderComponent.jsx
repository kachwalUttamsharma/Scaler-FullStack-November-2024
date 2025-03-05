import React, { createContext, useState } from "react";

export const AppContext = createContext();

const ProviderComponent = ({ children }) => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  return (
    <AppContext.Provider value={{ count, setCount, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default ProviderComponent;
