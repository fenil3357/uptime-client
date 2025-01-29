import { FC, ReactNode } from "react";
import { useUserContext } from "../contexts/user.context";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { ApiProvider } from "../contexts/api.context";

const UnauthorizedContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const { logout } = useUserContext()
  const showToast = useToast();
  const navigate = useNavigate();

  return <ApiProvider
    logout={logout}
    showToast={showToast}
    navigate={navigate}
  >
    {children}
  </ApiProvider>;
}

export default UnauthorizedContainer;