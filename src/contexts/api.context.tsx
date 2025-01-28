import { createContext, FC, ReactNode } from "react";

import { ApiContextType } from "../types/context.types";

const ApiContext = createContext<ApiContextType>({
  logout: () => { },
  navigate: () => { },
  showToast: () => { }
});

export const ApiProvider: FC<ApiContextType & { children: ReactNode }> = ({ children, logout, showToast, navigate }) => {
  return <ApiContext.Provider value={{
    logout,
    showToast,
    navigate
  }}>
    {children}
  </ApiContext.Provider>
}