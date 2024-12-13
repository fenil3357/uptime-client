import axios from "axios";

import { ENV_CONSTS } from "../../constants/env.constants";

export const axiosInstance = axios.create({
  baseURL: ENV_CONSTS.API_SERVER_BASE_URL
})