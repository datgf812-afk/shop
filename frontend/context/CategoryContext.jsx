import { createContext, useState } from "react";
export const categoryContext = createContext();
export function CategoryProvider({ children }) {
  const [selectCategory, setSelectCategory] = useState(null);

  return (
    <categoryContext.Provider value={{ selectCategory, setSelectCategory }}>
      {children}
    </categoryContext.Provider>
  );
}
