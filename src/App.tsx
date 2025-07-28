import { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import SplashScreen from "./components/SplashScreen";
import Header from "./components/Header";
import WeatherKPIs from "./components/WeatherKPIs";
import WeatherCharts from "./components/WeatherCharts";
import WeatherMap from "./components/WeatherMap";
import Alerts from "./components/Alerts";
import WeatherForecast from "./components/WeatherForecast";
import {
  generateHistoricalData,
  getCurrentWeatherData,
  subscribeToWeatherUpdates,
  mockStation,
  mockAlerts,
  mockForecast,
} from "./services/weatherService";
import type { WeatherData, WeatherAlert } from "./types/weather";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentData, setCurrentData] = useState<WeatherData>(
    getCurrentWeatherData()
  );
  const [previousData, setPreviousData] = useState<WeatherData | undefined>();
  const [historicalData, setHistoricalData] = useState<WeatherData[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlert[]>(mockAlerts);
  const [isConnected, setIsConnected] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "charts" | "map" | "forecast"
  >("dashboard");

  const handleStartApp = () => {
    setShowSplash(false);
  };

  useEffect(() => {
    // Cargar datos históricos
    const historical = generateHistoricalData(24);
    setHistoricalData(historical);

    // Configurar actualizaciones en tiempo real
    const unsubscribe = subscribeToWeatherUpdates((newData) => {
      setPreviousData(currentData);
      setCurrentData(newData);

      // Actualizar datos históricos
      setHistoricalData((prev) => [...prev.slice(-23), newData]);
    });

    // Simular desconexiones ocasionales
    const connectionInterval = setInterval(() => {
      setIsConnected((prev) => (Math.random() > 0.1 ? true : !prev));
    }, 30000);

    return () => {
      unsubscribe();
      clearInterval(connectionInterval);
    };
  }, [currentData]);

  const handleDismissAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isActive: false } : alert
      )
    );
  };

  const navigationTabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "charts", label: "Gráficos", icon: "📈" },
    { id: "map", label: "Mapa", icon: "🗺️" },
    { id: "forecast", label: "Pronóstico", icon: "🌤️" },
  ] as const;

  return (
    <ThemeProvider>
      {showSplash ? (
        <SplashScreen onStart={handleStartApp} />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-verde-50 to-cielo-50 dark:from-gray-900 dark:to-gray-800">
          <Header
            isConnected={isConnected}
            lastUpdate={currentData.timestamp}
          />

          {/* Navegación por pestañas responsive */}
          <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 border-b border-tierra-200 dark:border-gray-700 shadow-sm">
            <div className="px-4 sm:px-6">
              {/* Desktop Navigation */}
              <nav className="hidden sm:flex space-x-8">
                {navigationTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors hover:scale-105 ${
                      activeTab === tab.id
                        ? "border-verde-500 text-verde-600 dark:text-verde-400"
                        : "border-transparent text-gray-500 hover:text-verde-600 dark:text-gray-400 dark:hover:text-verde-400"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Mobile Navigation */}
              <nav className="sm:hidden">
                <div className="flex overflow-x-auto py-2 space-x-1 scrollbar-hide">
                  {navigationTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center space-y-1 py-3 px-4 rounded-lg font-medium text-xs transition-colors flex-shrink-0 min-w-0 ${
                        activeTab === tab.id
                          ? "bg-verde-100 dark:bg-verde-900/30 text-verde-700 dark:text-verde-400"
                          : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span className="truncate">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          {/* Contenido principal responsive */}
          <main className="p-4 sm:p-6">
            {activeTab === "dashboard" && (
              <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
                {/* KPIs */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                    Indicadores Clave
                  </h2>
                  <WeatherKPIs data={currentData} previousData={previousData} />
                </section>

                {/* Alertas */}
                <section>
                  <Alerts alerts={alerts} onDismissAlert={handleDismissAlert} />
                </section>

                {/* Resumen rápido responsive */}
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                  <div className="xl:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Resumen del Día
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-bold text-dorado-600 dark:text-dorado-400">
                            {Math.max(
                              ...historicalData.map((d) => d.temperature)
                            )}
                            °C
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Temp. Máx
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-bold text-cielo-600 dark:text-cielo-400">
                            {Math.min(
                              ...historicalData.map((d) => d.temperature)
                            )}
                            °C
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Temp. Mín
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-bold text-verde-600 dark:text-verde-400">
                            {Math.round(
                              historicalData.reduce(
                                (acc, d) => acc + d.humidity,
                                0
                              ) / historicalData.length
                            )}
                            %
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            Humedad Media
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-bold text-tierra-600 dark:text-tierra-400">
                            {Math.max(...historicalData.map((d) => d.uvIndex))}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            UV Máx
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Estado del Sistema
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Arduino
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-verde-500 rounded-full animate-pulse-slow"></div>
                          <span className="text-sm text-verde-600 dark:text-verde-400">
                            Online
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Sensores
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-verde-500 rounded-full animate-pulse-slow"></div>
                          <span className="text-sm text-verde-600 dark:text-verde-400">
                            Activos
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Almacenamiento
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-dorado-500 rounded-full"></div>
                          <span className="text-sm text-dorado-600 dark:text-dorado-400">
                            75%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "charts" && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Gráficos y Tendencias
                </h2>
                <WeatherCharts data={historicalData} />
              </div>
            )}

            {activeTab === "map" && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Ubicación y Mapa
                </h2>
                <WeatherMap station={mockStation} currentData={currentData} />
              </div>
            )}

            {activeTab === "forecast" && (
              <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Pronóstico del Tiempo
                </h2>
                <WeatherForecast forecast={mockForecast} />
              </div>
            )}
          </main>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
