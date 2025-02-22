import { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axios/axios.instance";
import { useUserContext } from "../contexts/user.context";

const useApi = ():AxiosInstance => {
  const { logout, access_token } = useUserContext()
  const navigate = useNavigate();
  
  // Append access_token in headers if user is logged in
  if (access_token) axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`;

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle unauthorized/forbidden error
      if (error.response?.status === 401 || error.response?.status === 403 || error?.response?.status === 429) {
        logout();
        navigate(`/`);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export default useApi