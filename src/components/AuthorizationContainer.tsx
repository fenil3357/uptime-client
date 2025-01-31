import { FC, ReactNode } from "react";
import { ApiProvider } from "../contexts/api.context";

const UnauthorizedContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return <ApiProvider>
    {children}
  </ApiProvider>;
}

export default UnauthorizedContainer;