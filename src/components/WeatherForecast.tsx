import React from "react";
import { Calendar, Droplets, Thermometer, Wind } from "lucide-react";
import type { Forecast } from "../types/weather";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ForecastProps {
  forecast: Forecast[];
}

const WeatherForecast: React.FC<ForecastProps> = ({ forecast }) => {
  const getPrecipitationColor = (precipitation: number) => {
    if (precipitation < 20) return "text-green-600 dark:text-green-400";
    if (precipitation < 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-blue-600 dark:text-blue-400";
  };

  const getPrecipitationBg = (precipitation: number) => {
    if (precipitation < 20) return "bg-green-100 dark:bg-green-900/30";
    if (precipitation < 50) return "bg-yellow-100 dark:bg-yellow-900/30";
    return "bg-blue-100 dark:bg-blue-900/30";
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center mb-6 space-x-2">
        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Extended Forecast (5 days)
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="p-4 transition-all duration-300 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600 hover:shadow-md hover:scale-105"
          >
            {/* Fecha */}
            <div className="mb-3 text-center">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {index === 0
                  ? "Today"
                  : format(day.date, "EEEE", { locale: es })}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {format(day.date, "dd/MM", { locale: es })}
              </div>
            </div>

            {/* Icono del clima */}
            <div className="mb-3 text-center">
              <span className="text-4xl" role="img" aria-label="weather icon">
                {day.icon}
              </span>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                {day.description}
              </div>
            </div>

            {/* Temperaturas */}
            <div className="flex items-center justify-center mb-3 space-x-2">
              <Thermometer className="w-4 h-4 text-red-500" />
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {day.temperature.max}°
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {day.temperature.min}°
                </div>
              </div>
            </div>

            {/* Humedad */}
            <div className="flex items-center justify-between mb-2 text-sm">
              <div className="flex items-center space-x-1">
                <Droplets className="w-3 h-3 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  Humidity
                </span>
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                {day.humidity}%
              </span>
            </div>

            {/* Precipitación */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Wind className="w-3 h-3 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-300">Rain</span>
              </div>
              <div className="flex items-center space-x-1">
                <span
                  className={`font-medium ${getPrecipitationColor(
                    day.precipitation
                  )}`}
                >
                  {day.precipitation}%
                </span>
                <div
                  className={`w-2 h-2 rounded-full ${getPrecipitationBg(
                    day.precipitation
                  )}`}
                ></div>
              </div>
            </div>

            {/* Barra de probabilidad de lluvia */}
            <div className="mt-3">
              <div className="w-full h-1 bg-gray-200 rounded-full dark:bg-gray-600">
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    day.precipitation < 20
                      ? "bg-green-500"
                      : day.precipitation < 50
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                  style={{ width: `${day.precipitation}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {Math.round(
                forecast.reduce((acc, day) => acc + day.temperature.max, 0) /
                  forecast.length
              )}
              °C
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              Average Temp.
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {Math.round(
                forecast.reduce((acc, day) => acc + day.humidity, 0) /
                  forecast.length
              )}
              %
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              Medium Humidity
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {forecast.filter((day) => day.precipitation > 50).length}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Rainy Days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
