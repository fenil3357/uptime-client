import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Menu } from "@headlessui/react";

import useToast from "../hooks/useToast";
import { deleteMonitorById, getMonitorById, updateMonitorById } from "../api/monitor.api";
import LineChartComponent from "../components/Chart";
import { MonitorDataType } from "../types/utils.types";
import { ReportType } from "../types/report.types";
import { formatCustomDate } from "../helper/customData";
import useApi from "../hooks/useApi";
import Button from "../components/Button";

const Monitor = () => {
  const [searchParams] = useSearchParams();
  const [reportEndDate, setReportEndDate] = useState<Date>(new Date());
  const [reportStartDate, setReportStartDate] = useState<Date>(
    new Date(new Date().setDate(reportEndDate.getDate() - 2))
  );
  const [monitorData, setMonitorData] = useState<MonitorDataType>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isReportLoading, setIsReportLoading] = useState<boolean>(true);
  const [id] = useState<string | null>(searchParams.get("id"));
  const [reportData, setReportData] = useState<ReportType[]>([]);
  const [isMonitorActive, setIsMonitorActive] = useState<boolean>(true);

  const navigate = useNavigate();
  const showToast = useToast();
  const axiosInstance = useApi();

  useEffect(() => {
    const getMonitorData = async () => {
      try {
        if (!id) {
          showToast("Invalid monitor id", "error");
          navigate("/dashboard");
          return;
        }

        const data = await getMonitorById(
          axiosInstance,
          id,
          "0",
          reportStartDate,
          reportEndDate
        );
        setMonitorData(data);
        setReportData(data?.Report);
        setIsMonitorActive(data?.is_active as boolean);
      } catch (error: any) {
        showToast(error?.response?.data?.message || "Something went wrong. Please try again");
      } finally {
        setLoading(false);
        setIsReportLoading(false);
      }
    };
    getMonitorData();
  }, []);

  const fetchReportData = async () => {
    setIsReportLoading(true);
    try {
      const data = await getMonitorById(
        axiosInstance,
        id as string,
        "1",
        reportStartDate,
        reportEndDate
      );
      setReportData(data?.Report)
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Something went wrong. Please try again");
    }
    finally {
      setIsReportLoading(false);
    }
  };

  const calculateUptime = () => {
    if (!reportData || reportData.length == 0) return 0;
    const totalReports = reportData.length;
    const successfulReports = reportData.filter(
      (report: ReportType) => report.status === "SUCCESS"
    ).length;
    return ((successfulReports / totalReports) * 100).toFixed(3);
  };

  const calculateErrorRate = () => {
    if (!reportData || reportData.length == 0) return 0;
    const totalReports = reportData.length;
    const errorReports = reportData.filter(
      (report: ReportType) => report.status !== "SUCCESS"
    ).length;
    return ((errorReports / totalReports) * 100).toFixed(3);
  };

  const handlePauseMonitor = async () => {
    try {
      const is_active = !isMonitorActive;
      await updateMonitorById(axiosInstance, id as string, {
        is_active
      });

      showToast(isMonitorActive ? `Monitor has been paused successfully, Now the ${monitorData?.name} ${monitorData?.type?.toLowerCase()} won't get monitored until you unpause it.` : `Monitor has been successfully unpaused, Now the ${monitorData?.name} ${monitorData?.type?.toLowerCase()} will be monitored.`, isMonitorActive ? 'warning' : 'success', {
        duration: 4000
      })
      setIsMonitorActive(!isMonitorActive);
    } catch (error: any) {
      showToast(error?.response?.data?.message || "Something went wrong. Please try again");
    }
  }

  const handleDeleteMonitor = async () => {
    try {
      await deleteMonitorById(axiosInstance, id as string);
      showToast('Monitor has been deleted successfully!');
      navigate('/dashboard')
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white">
      {isLoading ? (
        <div className="text-2xl font-bold">Loading...</div>
      ) : (
        <div className="w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold">{monitorData?.name}</h1>
              <h1 className="text-xl font-semibold mt-2 underline">
                <a href={monitorData?.endpoint} target="_blank">{monitorData?.endpoint}</a>
              </h1>
            </div>
            <p className={`text-sm ${isMonitorActive ? "text-green-400" : "text-red-400"}`}>
              {isMonitorActive ? "✅ Active" : "🚫 Paused"}
            </p>
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                ☰
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-gray-700 divide-y divide-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? "bg-blue-500 text-white" : "text-gray-200"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={handlePauseMonitor}
                      >
                        {isMonitorActive ? "⏸️ Pause Monitor" : "▶️ Unpause Monitor"}
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? "bg-blue-500 text-white" : "text-gray-200"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        🛠️ Update Monitor
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? "bg-red-500 text-white" : "text-gray-200"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={handleDeleteMonitor}
                      >
                        ⚠️ Delete Monitor
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Uptime Percentage</h2>
              <p className="text-2xl font-semibold text-green-400">{calculateUptime()}%</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Error Rate</h2>
              <p className="text-2xl font-semibold text-red-400">{calculateErrorRate()}%</p>
            </div>
          </div>
          <div className="mt-6">
            <LineChartComponent
              title="Response Timings"
              data={
                reportData?.map((report: ReportType) => ({
                  time: formatCustomDate(new Date(report.createdAt)),
                  value: report.time_taken || 0,
                  status: report.status,
                  errorDetails: report.message as string,
                })) || []
              }
              lineColor="#00eaff"
            />
          </div>
          <div className="flex justify-between items-center mt-6">
            <DateTimePicker
              label="Start Date"
              className="w-1/2 mr-2"
              defaultValue={dayjs(reportStartDate)}
              onChange={(value: any) => setReportStartDate(value.$d)}
              sx={{
                "& .MuiInputBase-root": {
                  color: "white", // Text color
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Label color
                },
                "& .MuiSvgIcon-root": {
                  color: "white", // Icon color
                },
              }}
            />
            <DateTimePicker
              label="End Date"
              className="w-1/2 ml-2"
              defaultValue={dayjs(reportEndDate)}
              onChange={(value: any) => setReportEndDate(value.$d)}
              sx={{
                "& .MuiInputBase-root": {
                  color: "white", // Text color
                },
                "& .MuiInputLabel-root": {
                  color: "white", // Label color
                },
                "& .MuiSvgIcon-root": {
                  color: "white", // Icon color
                },
              }}
            />
          </div>
          <div className="flex items-center justify-center mt-4">
            <Button
              onClick={fetchReportData}
              label="Fetch report data"
              isLoading={isReportLoading}
            />
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Error Reports</h2>
            <ul className="bg-gray-700 p-4 rounded-lg divide-y divide-gray-600">
              {reportData?.filter((report: ReportType) => report.status !== "SUCCESS").map(
                (errorReport: ReportType, index: number) => (
                  <li key={index} className="py-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Time:</span>
                      <span>{formatCustomDate(new Date(errorReport.createdAt))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Error:</span>
                      <span className="text-red-400">{errorReport.message}</span>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monitor;