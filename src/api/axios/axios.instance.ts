import axios, { AxiosInstance } from "axios";

import { ENV_CONSTS } from "../../constants/env.constants";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: ENV_CONSTS.API_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

export default axiosInstance;