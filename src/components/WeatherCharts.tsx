import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { WeatherData } from "../types/weather";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WeatherChartsProps {
  data: WeatherData[];
}

const WeatherCharts: React.FC<WeatherChartsProps> = ({ data }) => {
  const labels = data.map((item) => format(item.timestamp, "HH:mm"));

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          color: "rgba(156, 163, 175, 0.2)",
        },
        ticks: {
          color: "rgb(107, 114, 128)",
        },
      },
      y: {
        grid: {
          color: "rgba(156, 163, 175, 0.2)",
        },
        ticks: {
          color: "rgb(107, 114, 128)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "rgb(107, 114, 128)",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(156, 163, 175, 0.3)",
        borderWidth: 1,
      },
    },
  };

  const temperatureData = {
    labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: data.map((item) => item.temperature),
        borderColor: "#f59e0b", // dorado-500
        backgroundColor: "rgba(245, 158, 11, 0.1)", // dorado-500 con transparencia
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const humidityData = {
    labels,
    datasets: [
      {
        label: "Humedad (%)",
        data: data.map((item) => item.humidity),
        borderColor: "#0ea5e9", // cielo-500
        backgroundColor: "rgba(14, 165, 233, 0.1)", // cielo-500 con transparencia
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const pressureData = {
    labels,
    datasets: [
      {
        label: "Presión (hPa)",
        data: data.map((item) => item.pressure),
        borderColor: "#22c55e", // verde-500
        backgroundColor: "rgba(34, 197, 94, 0.1)", // verde-500 con transparencia
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const multiData = {
    labels,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: data.map((item) => item.temperature),
        borderColor: "#f59e0b", // dorado-500
        backgroundColor: "rgba(245, 158, 11, 0.1)", // dorado-500 con transparencia
        yAxisID: "y",
        tension: 0.4,
      },
      {
        label: "Humedad (%)",
        data: data.map((item) => item.humidity),
        borderColor: "#0ea5e9", // cielo-500
        backgroundColor: "rgba(14, 165, 233, 0.1)", // cielo-500 con transparencia
        yAxisID: "y1",
        tension: 0.4,
      },
    ],
  };

  const multiOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Temperatura (°C)",
          color: "#f59e0b", // dorado-500
        },
      },
      y1: {
        ...chartOptions.scales.y,
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Humedad (%)",
          color: "#0ea5e9", // cielo-500
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Gráfico de Temperatura */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Temperature Trend (24h)
        </h3>
        <div className="h-64">
          <Line data={temperatureData} options={chartOptions} />
        </div>
      </div>

      {/* Gráfico de Humedad */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Humidity Trend (24h)
        </h3>
        <div className="h-64">
          <Line data={humidityData} options={chartOptions} />
        </div>
      </div>

      {/* Gráfico de Presión */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Atmospheric Pressure Trend (24h)
        </h3>
        <div className="h-64">
          <Line data={pressureData} options={chartOptions} />
        </div>
      </div>

      {/* Gráfico Combinado */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Temperature vs Humidity (24h)
        </h3>
        <div className="h-64">
          <Line data={multiData} options={multiOptions} />
        </div>
      </div>
    </div>
  );
};

export default WeatherCharts;
