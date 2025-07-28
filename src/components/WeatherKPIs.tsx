import React from "react";
import {
  Thermometer,
  Droplets,
  Gauge,
  Sun,
  Wind,
  CloudRain,
  Eye,
  Zap,
} from "lucide-react";
import type { WeatherData } from "../types/weather";

interface KPICardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  color?: "verde" | "tierra" | "cielo" | "dorado";
  subtitle?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  icon,
  trend = "neutral",
  color = "cielo",
  subtitle,
}) => {
  const colorClasses = {
    verde:
      "bg-verde-50 dark:bg-verde-900/20 border-verde-200 dark:border-verde-800",
    tierra:
      "bg-tierra-50 dark:bg-tierra-900/20 border-tierra-200 dark:border-tierra-800",
    cielo:
      "bg-cielo-50 dark:bg-cielo-900/20 border-cielo-200 dark:border-cielo-800",
    dorado:
      "bg-dorado-50 dark:bg-dorado-900/20 border-dorado-200 dark:border-dorado-800",
  };

  const iconColorClasses = {
    verde: "text-verde-600 dark:text-verde-400",
    tierra: "text-tierra-600 dark:text-tierra-400",
    cielo: "text-cielo-600 dark:text-cielo-400",
    dorado: "text-dorado-600 dark:text-dorado-400",
  };

  const getTrendIcon = () => {
    if (trend === "up") return "↗️";
    if (trend === "down") return "↘️";
    return "→";
  };

  return (
    <div
      className={`rounded-lg border-2 ${colorClasses[color]} p-6 transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-full ${colorClasses[color]} ${iconColorClasses[color]}`}
        >
          {icon}
        </div>
        <span className="text-2xl">{getTrendIcon()}</span>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </span>
          <span className="text-lg text-gray-500 dark:text-gray-400">
            {unit}
          </span>
        </div>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

interface WeatherKPIsProps {
  data: WeatherData;
  previousData?: WeatherData;
}

const WeatherKPIs: React.FC<WeatherKPIsProps> = ({ data, previousData }) => {
  const getTrend = (current: number, previous?: number) => {
    if (!previous) return "neutral";
    if (current > previous) return "up";
    if (current < previous) return "down";
    return "neutral";
  };

  const getTemperatureColor = (
    temp: number
  ): "verde" | "tierra" | "cielo" | "dorado" => {
    if (temp < 15) return "cielo"; // Frío - azul cielo
    if (temp < 25) return "verde"; // Templado - verde natural
    if (temp < 32) return "dorado"; // Cálido - dorado sol
    return "tierra"; // Caliente - tierra seca
  };

  const getUVColor = (uv: number): "verde" | "tierra" | "cielo" | "dorado" => {
    if (uv < 3) return "verde"; // Bajo - verde seguro
    if (uv < 6) return "dorado"; // Moderado - dorado
    if (uv < 8) return "dorado"; // Alto - dorado intenso
    return "tierra"; // Muy alto - tierra seca
  };

  const getHumidityColor = (
    humidity: number
  ): "verde" | "tierra" | "cielo" | "dorado" => {
    if (humidity < 30) return "tierra"; // Seco - tierra
    if (humidity < 50) return "dorado"; // Bajo - dorado
    if (humidity < 70) return "verde"; // Ideal - verde
    return "cielo"; // Alto - cielo/lluvia
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        title="Temperatura Actual"
        value={data.temperature}
        unit="°C"
        icon={<Thermometer size={24} />}
        trend={getTrend(data.temperature, previousData?.temperature)}
        color={getTemperatureColor(data.temperature)}
        subtitle="Sensación térmica"
      />

      <KPICard
        title="Humedad Relativa"
        value={data.humidity}
        unit="%"
        icon={<Droplets size={24} />}
        trend={getTrend(data.humidity, previousData?.humidity)}
        color={getHumidityColor(data.humidity)}
        subtitle="Humedad del aire"
      />

      <KPICard
        title="Presión Atmosférica"
        value={data.pressure}
        unit="hPa"
        icon={<Gauge size={24} />}
        trend={getTrend(data.pressure, previousData?.pressure)}
        color="cielo"
        subtitle="Presión barométrica"
      />

      <KPICard
        title="Índice UV"
        value={data.uvIndex}
        unit="UV"
        icon={<Sun size={24} />}
        trend={getTrend(data.uvIndex, previousData?.uvIndex)}
        color={getUVColor(data.uvIndex)}
        subtitle="Radiación solar"
      />

      <KPICard
        title="Velocidad del Viento"
        value={data.windSpeed}
        unit="km/h"
        icon={<Wind size={24} />}
        trend={getTrend(data.windSpeed, previousData?.windSpeed)}
        color="verde"
        subtitle={`Dirección: ${data.windDirection}°`}
      />

      <KPICard
        title="Precipitación"
        value={data.precipitation}
        unit="mm"
        icon={<CloudRain size={24} />}
        trend={getTrend(data.precipitation, previousData?.precipitation)}
        color="cielo"
        subtitle="Lluvia acumulada"
      />

      <KPICard
        title="Nivel de Luz"
        value={data.lightLevel}
        unit="lux"
        icon={<Eye size={24} />}
        trend={getTrend(data.lightLevel, previousData?.lightLevel)}
        color="dorado"
        subtitle="Luminosidad ambiente"
      />

      <KPICard
        title="Última Actualización"
        value={data.timestamp.toLocaleTimeString()}
        unit=""
        icon={<Zap size={24} />}
        color="verde"
        subtitle="Datos en tiempo real"
      />
    </div>
  );
};

export default WeatherKPIs;
