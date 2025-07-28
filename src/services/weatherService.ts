import type {
  WeatherData,
  Station,
  WeatherAlert,
  Forecast,
} from "../types/weather";
import { addHours, subHours } from "date-fns";

// Datos simulados para la estación meteorológica
export const mockStation: Station = {
  id: "station-001",
  name: "AgroClima Vega - Viveros El Jardín",
  location: {
    lat: 19.2237, // La Vega, República Dominicana
    lng: -70.5287,
  },
  isActive: true,
};

// Generar datos históricos simulados
export const generateHistoricalData = (hours: number = 24): WeatherData[] => {
  const data: WeatherData[] = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = subHours(now, i);
    const baseTemp = 20 + Math.sin(i * 0.2) * 8; // Variación sinusoidal
    const randomVariation = (Math.random() - 0.5) * 4;

    data.push({
      id: `data-${i}`,
      timestamp,
      temperature: Math.round((baseTemp + randomVariation) * 10) / 10,
      humidity:
        Math.round(
          (60 + Math.sin(i * 0.15) * 20 + (Math.random() - 0.5) * 10) * 10
        ) / 10,
      pressure:
        Math.round(
          (1013 + Math.sin(i * 0.1) * 10 + (Math.random() - 0.5) * 5) * 10
        ) / 10,
      uvIndex: Math.max(
        0,
        Math.round(
          (5 + Math.sin(i * 0.3) * 3 + (Math.random() - 0.5) * 2) * 10
        ) / 10
      ),
      windSpeed: Math.max(
        0,
        Math.round(
          (10 + Math.sin(i * 0.25) * 5 + (Math.random() - 0.5) * 3) * 10
        ) / 10
      ),
      windDirection: Math.round(Math.random() * 360),
      precipitation: Math.max(0, Math.round(Math.random() * 2 * 10) / 10),
      lightLevel: Math.max(
        0,
        Math.round(
          (500 + Math.sin(i * 0.2) * 300 + (Math.random() - 0.5) * 100) * 10
        ) / 10
      ),
    });
  }

  return data.reverse(); // Más reciente primero
};

// Datos en tiempo real simulados
export const getCurrentWeatherData = (): WeatherData => {
  const now = new Date();
  return {
    id: `current-${now.getTime()}`,
    timestamp: now,
    temperature: Math.round((22 + (Math.random() - 0.5) * 4) * 10) / 10,
    humidity: Math.round((65 + (Math.random() - 0.5) * 10) * 10) / 10,
    pressure: Math.round((1015 + (Math.random() - 0.5) * 8) * 10) / 10,
    uvIndex: Math.round((6 + (Math.random() - 0.5) * 2) * 10) / 10,
    windSpeed: Math.round((12 + (Math.random() - 0.5) * 6) * 10) / 10,
    windDirection: Math.round(Math.random() * 360),
    precipitation: Math.round(Math.random() * 1 * 10) / 10,
    lightLevel: Math.round((600 + (Math.random() - 0.5) * 200) * 10) / 10,
  };
};

// Alertas simuladas
export const mockAlerts: WeatherAlert[] = [
  {
    id: "alert-1",
    type: "temperature",
    severity: "medium",
    message: "Temperatura alta detectada: 28.5°C",
    timestamp: subHours(new Date(), 2),
    isActive: true,
  },
  {
    id: "alert-2",
    type: "humidity",
    severity: "low",
    message: "Humedad por debajo del promedio: 45%",
    timestamp: subHours(new Date(), 4),
    isActive: true,
  },
  {
    id: "alert-3",
    type: "uv",
    severity: "high",
    message: "Índice UV extremo: 9.2",
    timestamp: subHours(new Date(), 1),
    isActive: true,
  },
];

// Pronóstico simulado
export const mockForecast: Forecast[] = [
  {
    date: new Date(),
    temperature: { min: 18, max: 26 },
    humidity: 68,
    precipitation: 10,
    description: "Parcialmente nublado",
    icon: "⛅",
  },
  {
    date: addHours(new Date(), 24),
    temperature: { min: 20, max: 28 },
    humidity: 65,
    precipitation: 5,
    description: "Soleado",
    icon: "☀️",
  },
  {
    date: addHours(new Date(), 48),
    temperature: { min: 17, max: 24 },
    humidity: 75,
    precipitation: 60,
    description: "Lluvia ligera",
    icon: "🌧️",
  },
  {
    date: addHours(new Date(), 72),
    temperature: { min: 19, max: 27 },
    humidity: 62,
    precipitation: 15,
    description: "Parcialmente nublado",
    icon: "⛅",
  },
  {
    date: addHours(new Date(), 96),
    temperature: { min: 21, max: 29 },
    humidity: 58,
    precipitation: 0,
    description: "Soleado",
    icon: "☀️",
  },
];

// Simulación de actualizaciones en tiempo real
export const subscribeToWeatherUpdates = (
  callback: (data: WeatherData) => void
) => {
  const interval = setInterval(() => {
    callback(getCurrentWeatherData());
  }, 5000); // Actualizar cada 5 segundos

  return () => clearInterval(interval);
};
