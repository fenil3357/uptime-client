import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ApiProvider } from "../contexts/api.context";
import useApi from "../hooks/useApi";
import { getOneUser } from "../api/user.api";
import { useUserContext } from "../contexts/user.context";
import { user } from "../types/user.types";

const UnauthorizedContainer: FC<{ children: ReactNode }> = ({ children }) => {

  const axiosInstance = useApi();
  const { setUser, isLoggedIn, logout } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getOneUser(axiosInstance);
        setUser(user as user);
      } catch (error) {
        logout();
        navigate('/');
      }
    }
    if (isLoggedIn) fetchUserData();
  }, []);

  return <ApiProvider>
    {children}
  </ApiProvider>;
}

export default UnauthorizedContainer;