import { MonitorType } from "./monitor.types";
import { ReportType } from "./report.types";

export type UserMonitorsType = (Partial<MonitorType> & { Report: ReportType[] })[]