import { createContext, useContext, useState } from "react";

export const UtilsContext = createContext();

export const UtilsProvider = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <UtilsContext.Provider value={[openDrawer, setOpenDrawer]}>
      {children}
    </UtilsContext.Provider>
  );
};

export const useUtilsProvider = () => {
  return useContext(UtilsContext);
};
