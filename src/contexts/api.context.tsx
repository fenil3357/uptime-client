import { createContext, FC, ReactNode } from "react";

const ApiContext = createContext<{}>({});

export const ApiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <ApiContext.Provider value={{}}>
    {children}
  </ApiContext.Provider>
}