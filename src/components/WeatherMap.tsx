import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Station, WeatherData } from "../types/weather";

// Fix para los iconos de Leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface WeatherMapProps {
  station: Station;
  currentData: WeatherData;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ station, currentData }) => {
  // Crear icono personalizado para la estación meteorológica
  const stationIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml;base64," +
      btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3B82F6" width="32" height="32">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Color del círculo basado en la temperatura
  const getTemperatureColor = (temp: number) => {
    if (temp < 10) return "#3B82F6"; // Azul
    if (temp < 20) return "#10B981"; // Verde
    if (temp < 30) return "#F59E0B"; // Amarillo
    if (temp < 35) return "#F97316"; // Naranja
    return "#EF4444"; // Rojo
  };

  // Radio del círculo basado en la humedad (representación visual)
  const getHumidityRadius = (humidity: number) => {
    return (humidity / 100) * 1000 + 500; // Entre 500m y 1500m
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Ubicación de la Estación Meteorológica
      </h3>

      <div className="h-96 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
        <MapContainer
          center={[station.location.lat, station.location.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          className="z-0 leaflet-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marcador de la estación */}
          <Marker
            position={[station.location.lat, station.location.lng]}
            icon={stationIcon}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-48">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {station.name}
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Temperatura:</span>
                    <span className="font-medium">
                      {currentData.temperature}°C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Humedad:</span>
                    <span className="font-medium">{currentData.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Presión:</span>
                    <span className="font-medium">
                      {currentData.pressure} hPa
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Viento:</span>
                    <span className="font-medium">
                      {currentData.windSpeed} km/h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>UV:</span>
                    <span className="font-medium">{currentData.uvIndex}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Última actualización:{" "}
                    {currentData.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>

          {/* Círculo de influencia basado en temperatura */}
          <Circle
            center={[station.location.lat, station.location.lng]}
            radius={getHumidityRadius(currentData.humidity)}
            color={getTemperatureColor(currentData.temperature)}
            fillColor={getTemperatureColor(currentData.temperature)}
            fillOpacity={0.2}
            weight={2}
          />
        </MapContainer>
      </div>

      {/* Leyenda del mapa */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-300">
            Frío (&lt;10°C)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-300">
            Templado (10-20°C)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-300">
            Cálido (20-30°C)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-300">
            Caliente (&gt;30°C)
          </span>
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        * El tamaño del círculo representa la humedad relativa
      </div>
    </div>
  );
};

export default WeatherMap;
