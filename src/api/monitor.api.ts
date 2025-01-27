import { MonitorType } from "../types/monitor.types";
import { MonitorDataType, UserMonitorsType } from "../types/utils.types";
import { createAxiosInstance } from "./axios/axios.instance";

export const getUserMonitors = async (access_token: string): Promise<UserMonitorsType> => {
  const res = await createAxiosInstance(access_token).get('/monitors');
  return res.data?.data;
}

export const getMonitorById = async (access_token: string, id: string, reportOnly: '0' | '1', reportStartDate?: Date, reportEndDate?: Date): Promise<MonitorDataType> => {
  const params = new URLSearchParams({ id, reportOnly });

  if (reportStartDate) params.append("reportStartDate", reportStartDate.toISOString());
  if (reportEndDate) params.append("reportEndDate", reportEndDate.toISOString());

  const res = await createAxiosInstance(access_token).get(`/monitors/id?${params.toString()}`);
  return res.data?.data;
}

export const updateMonitorById = async (access_token: string, id: string, data: Omit<Partial<MonitorType>, 'id' | 'user_id' | 'createdAt' | 'updatedAt'>):Promise<MonitorType> => {
  const res = await createAxiosInstance(access_token).patch(`/monitors/${id}`, data);
  return res.data?.data;
}