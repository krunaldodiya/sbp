import React, { createContext, useState } from "react";

export const StoreContext = createContext({});

export function StoreProvider({ children }: any) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  return (
    <StoreContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedLanguage,
        setSelectedLanguage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
