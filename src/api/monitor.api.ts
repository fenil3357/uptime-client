import { AxiosInstance } from "axios";
import { MonitorFormType, MonitorType } from "../types/monitor.types";
import { MonitorDataType, UserMonitorsType } from "../types/utils.types";

export const getUserMonitors = async (axios: AxiosInstance): Promise<UserMonitorsType> => {
  const res = await axios.get('/monitors');
  return res.data?.data;
}

export const getMonitorById = async (axios: AxiosInstance, id: string, reportOnly: '0' | '1', monitorOnly: '0' | '1', reportStartDate?: Date, reportEndDate?: Date): Promise<MonitorDataType> => {
  const params = new URLSearchParams({ id, reportOnly, monitorOnly });

  if (reportStartDate) params.append("reportStartDate", reportStartDate.toISOString());
  if (reportEndDate) params.append("reportEndDate", reportEndDate.toISOString());

  const res = await axios.get(`/monitors/id?${params.toString()}`);
  return res?.data?.data;
}

export const updateMonitorById = async (axios: AxiosInstance, id: string, data: MonitorFormType): Promise<MonitorType> => {
  const res = await axios.patch(`/monitors/${id}`, data);
  return res?.data?.data;
}

export const deleteMonitorById = async (axios: AxiosInstance, id: string): Promise<void> => {
  await axios.delete(`/monitors/${id}`);
}

export const createMonitor = async (axios: AxiosInstance, data: MonitorFormType): Promise<MonitorDataType> => {
  const res = await axios.post(`/monitors`, data);
  return res?.data?.data;
}