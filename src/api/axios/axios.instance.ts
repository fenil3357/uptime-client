import axios from "axios";

import { ENV_CONSTS } from "../../constants/env.constants";

export const createAxiosInstance = (access_token?: string) => axios.create({
  baseURL: ENV_CONSTS.API_SERVER_BASE_URL,
  headers: {
    Authorization: access_token ? `Bearer ${access_token}` : undefined
  }
}) 