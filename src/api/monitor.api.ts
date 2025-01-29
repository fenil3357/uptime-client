import { AxiosInstance } from "axios";
import { MonitorType } from "../types/monitor.types";
import { MonitorDataType, UserMonitorsType } from "../types/utils.types";

export const getUserMonitors = async (axios: AxiosInstance): Promise<UserMonitorsType> => {
  const res = await axios.get('/monitors');
  return res.data?.data;
}

export const getMonitorById = async (axios: AxiosInstance, id: string, reportOnly: '0' | '1', reportStartDate?: Date, reportEndDate?: Date): Promise<MonitorDataType> => {
  const params = new URLSearchParams({ id, reportOnly });

  if (reportStartDate) params.append("reportStartDate", reportStartDate.toISOString());
  if (reportEndDate) params.append("reportEndDate", reportEndDate.toISOString());

  const res = await axios.get(`/monitors/id?${params.toString()}`);
  return res.data?.data;
}

export const updateMonitorById = async (axios: AxiosInstance, id: string, data: Partial<Omit<MonitorType, 'id' | 'user_id' | 'createdAt' | 'updatedAt'>>): Promise<MonitorType> => {
  const res = await axios.patch(`/monitors/${id}`, data);
  return res.data?.data;
}

export const deleteMonitorById = async (axios: AxiosInstance, id: string): Promise<void> => {
  await axios.delete(`/monitors/${id}`);
}