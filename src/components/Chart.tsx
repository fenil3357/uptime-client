import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

type LineChartComponentProps = {
  title: string;
  data: { time: string; value: number; status: string; errorDetails?: string }[];
  lineColor?: string;
};

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  title,
  data,
  lineColor = "#8884d8",
}) => {
  // Map colors based on the status for each point
  const pointColors = data.map((point) =>
    point.status === "SUCCESS" ? "#20ff03" : "#ff0000"
  );

  const chartData = {
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: title,
        data: data.map((item) => item.value),
        borderColor: lineColor,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
        tension: 0.2,
        pointBackgroundColor: pointColors,
        pointBorderColor: pointColors
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const pointData = data[tooltipItem.dataIndex];
            if (pointData.status === "ERROR") {
              return `Error⚠️: ${pointData.errorDetails || "No details"}`;
            }
            return `Healthy✅, Response time: ${pointData.value} ms`;
          } 
        },
      },
    },
    scales: {
      x: {
        beginAtZero: false,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChartComponent;
