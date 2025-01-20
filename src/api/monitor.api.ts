import { UserMonitorsType } from "../types/utils.types";
import { createAxiosInstance } from "./axios/axios.instance";

export const getUserMonitors = async (access_token: string): Promise<UserMonitorsType> => {
  const res = await createAxiosInstance(access_token).get('/monitors');
  return res.data?.data;
}