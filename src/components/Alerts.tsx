import React from "react";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import type { WeatherAlert } from "../types/weather";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface AlertsProps {
  alerts: WeatherAlert[];
  onDismissAlert?: (alertId: string) => void;
}

const Alerts: React.FC<AlertsProps> = ({ alerts, onDismissAlert }) => {
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <XCircle className="w-5 h-5" />;
      case "medium":
        return <AlertTriangle className="w-5 h-5" />;
      case "low":
        return <Info className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getAlertClasses = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200";
      case "medium":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200";
      case "low":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200";
      default:
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200";
    }
  };

  const getIconClasses = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 dark:text-red-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "low":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-green-600 dark:text-green-400";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "high":
        return "CRITICISM";
      case "medium":
        return "WARNING";
      case "low":
        return "INFORMATION";
      default:
        return "NORMAL";
    }
  };

  const activeAlerts = alerts.filter((alert) => alert.isActive);

  if (activeAlerts.length === 0) {
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          System Alerts
        </h3>
        <div className="py-8 text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
          <p className="text-gray-500 dark:text-gray-400">
            There are no active alerts at this time
          </p>
          <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
            All parameters are within normal ranges
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          System Alerts
        </h3>
        <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full dark:bg-red-900/30 dark:text-red-200">
          {activeAlerts.length} active{activeAlerts.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3">
        {activeAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 ${getAlertClasses(
              alert.severity
            )}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`mt-0.5 ${getIconClasses(alert.severity)}`}>
                  {getAlertIcon(alert.severity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1 space-x-2">
                    <span className="text-xs font-bold tracking-wide uppercase">
                      {getSeverityText(alert.severity)}
                    </span>
                    <span className="text-xs opacity-75">•</span>
                    <span className="text-xs opacity-75">
                      {alert.type.toUpperCase()}
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-medium">{alert.message}</p>
                  <p className="text-xs opacity-75">
                    {formatDistanceToNow(alert.timestamp, {
                      addSuffix: true,
                      locale: es,
                    })}
                  </p>
                </div>
              </div>
              {onDismissAlert && (
                <button
                  onClick={() => onDismissAlert(alert.id)}
                  className="ml-4 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                  title="Descartar alerta"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Resumen de alertas por tipo */}
      <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {activeAlerts.filter((a) => a.severity === "high").length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Criticisms
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {activeAlerts.filter((a) => a.severity === "medium").length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Warnings
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {activeAlerts.filter((a) => a.severity === "low").length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Information
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
