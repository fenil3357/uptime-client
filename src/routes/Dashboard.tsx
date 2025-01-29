import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useToast from "../hooks/useToast";
import { getUserMonitors } from "../api/monitor.api";
import { UserMonitorsType } from "../types/utils.types";
import Loader from "../components/Loader";
import LineChartComponent from "../components/Chart";
import { useUserContext } from "../contexts/user.context";
import useApi from "../hooks/useApi";
// import axiosInstance from "../api/axios/axios.instance";

const Dashboard = () => {
  const showToast = useToast();
  const [monitors, setMonitors] = useState<UserMonitorsType>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { isLoggedIn } = useUserContext();
  const axiosInstance = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    const getAllMonitors = async () => {
      try {
        const monitors: UserMonitorsType = await getUserMonitors(axiosInstance);
        setMonitors(monitors);
      } catch (error: any) {
        showToast(error?.response?.data?.message || "Something went wrong. Please try again");
      } finally {
        setLoading(false);
      }
    };
    getAllMonitors();
  }, [isLoggedIn]);

  const handleCreateMonitor = () => {
  };

  const handleOpenMonitor = (id: string) => {
    navigate(`/monitor?id=${id}`)
  }

  return (
    <div className="min-h-screen py-8">
      {/* Dashboard Heading */}
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        {isLoading ? 'Fetching monitor data' : (monitors.length === 0 ? `You don't have any monitor. Start by creating one!` : 'All monitors')}
      </h1>

      {/* Dashboard Content */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-4 flex flex-wrap justify-center gap-8">
          {monitors.map((monitor) => (
            <div
              key={monitor.id}
              className="bg-gray-950 p-8 rounded-lg shadow-lg flex flex-col h-[400px] justify-between w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4 text-center">{monitor.name}</h2>

              <p className="text-sm mb-4 text-center">
                <strong>Status:</strong> {monitor.is_active ? <span className="bg-green-600 p-1 rounded-lg">Active</span> : <span className="bg-red-600 p-1 rounded-lg">Inactive</span>} |{" "}
                <strong>Type:</strong> {monitor.type === 'WEBSITE' ? 'Website' : 'API'}
              </p>

              <LineChartComponent
                title="LAST 5 REPORTS"
                data={monitor.Report.map((report) => ({
                  time: new Date(report.createdAt).toLocaleTimeString(),
                  value: report.time_taken || 0,
                  status: report.status, // Include status
                  errorDetails: report.message as string, // Include error details if available
                }))}
                lineColor="#00eaff"
              />

              {/* Button to redirect to monitor page */}
              <button
                rel="noopener noreferrer"
                className="mt-auto bg-green-500 text-white py-3 rounded-lg text-center hover:bg-green-600 transition"
                onClick={() => handleOpenMonitor(monitor.id as string)}
              >
                OPEN
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Button to Create New Monitor */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleCreateMonitor}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Create New Monitor
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
