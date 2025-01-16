import { UserMonitorsType } from "../types/utils.types";
import { axiosInstanceWithAuth } from "./axios/axios.instance"

export const getUserMonitors = async (): Promise<UserMonitorsType> => {
  const res = await axiosInstanceWithAuth.get('/monitors');
  return res.data?.data;
}