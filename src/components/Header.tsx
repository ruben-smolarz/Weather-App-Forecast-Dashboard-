import React, { useState } from "react";
import {
  Sun,
  Moon,
  Wifi,
  WifiOff,
  Settings,
  Activity,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface HeaderProps {
  isConnected: boolean;
  lastUpdate?: Date;
}

const Header: React.FC<HeaderProps> = ({ isConnected, lastUpdate }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b shadow-lg bg-gradient-to-r from-verde-600 to-verde-700 dark:from-gray-800 dark:to-gray-900 border-tierra-200 dark:border-gray-700">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo y título */}
          <div className="flex items-center flex-1 min-w-0 space-x-3">
            <div className="flex-shrink-0 p-2 rounded-lg bg-white/20 dark:bg-verde-500 backdrop-blur-sm">
              <Activity className="w-5 h-5 text-white sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-white truncate sm:text-xl">
                AgroClima Vega
              </h1>
              <p className="hidden text-xs sm:text-sm text-verde-100 dark:text-tierra-400 sm:block">
                Smart Monitoring for Orchards and Nurseries
              </p>
            </div>
          </div>

          {/* Controles Desktop */}
          <div className="items-center hidden space-x-4 lg:flex">
            {/* Estado de conexión */}
            <div className="flex items-center px-3 py-2 space-x-2 rounded-lg bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm">
              {isConnected ? (
                <>
                  <Wifi className="w-4 h-4 text-verde-300" />
                  <span className="text-sm font-medium text-white">
                    Connected
                  </span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-red-300" />
                  <span className="text-sm font-medium text-red-200">
                    Offline
                  </span>
                </>
              )}
            </div>

            {/* Última actualización */}
            {lastUpdate && (
              <div className="flex items-center px-3 py-2 space-x-2 text-sm rounded-lg text-verde-100 dark:text-gray-300 bg-white/10 dark:bg-gray-700/30 backdrop-blur-sm">
                <span>Last update:</span>
                <span className="font-medium">
                  {lastUpdate.toLocaleTimeString()}
                </span>
              </div>
            )}

            {/* Divisor */}
            <div className="w-px h-6 bg-white/30 dark:bg-gray-600"></div>

            {/* Toggle de tema */}
            <button
              onClick={toggleTheme}
              className="p-2 transition-colors rounded-lg bg-white/20 dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600/70 backdrop-blur-sm"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-dorado-300" />
              ) : (
                <Moon className="w-4 h-4 text-white" />
              )}
            </button>

            {/* Botón de configuración */}
            <button
              className="p-2 transition-colors rounded-lg bg-white/20 dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600/70 backdrop-blur-sm"
              title="Configuración"
            >
              <Settings className="w-4 h-4 text-white dark:text-gray-300" />
            </button>
          </div>

          {/* Controles Móviles - Solo botones esenciales */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Estado de conexión móvil */}
            <div className="flex items-center p-2 rounded-lg bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm">
              {isConnected ? (
                <Wifi className="w-4 h-4 text-verde-300" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-300" />
              )}
            </div>

            {/* Toggle de tema móvil */}
            <button
              onClick={toggleTheme}
              className="p-2 transition-colors rounded-lg bg-white/20 dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600/70 backdrop-blur-sm"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-dorado-300" />
              ) : (
                <Moon className="w-4 h-4 text-white" />
              )}
            </button>

            {/* Botón menú móvil */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 transition-colors rounded-lg bg-white/20 dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600/70 backdrop-blur-sm"
              title="Menú"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Menú móvil expandible */}
        {isMobileMenuOpen && (
          <div className="p-4 mt-4 space-y-3 rounded-lg lg:hidden bg-white/10 dark:bg-gray-700/30 backdrop-blur-sm">
            {/* Estado de conexión detallado */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-verde-100 dark:text-gray-300">
                State:
              </span>
              <span
                className={`text-sm font-medium ${
                  isConnected ? "text-verde-300" : "text-red-300"
                }`}
              >
                {isConnected ? "Conectado" : "Desconectado"}
              </span>
            </div>

            {/* Última actualización móvil */}
            {lastUpdate && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-verde-100 dark:text-gray-300">
                  Update:
                </span>
                <span className="text-sm font-medium text-white">
                  {lastUpdate.toLocaleTimeString()}
                </span>
              </div>
            )}

            {/* Configuración móvil */}
            <button className="flex items-center justify-between w-full py-2 text-sm transition-colors text-verde-100 dark:text-gray-300 hover:text-white">
              <span>Configuration</span>
              <Settings className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Barra de estado responsive */}
        <div className="p-3 mt-4 rounded-lg bg-white/10 dark:bg-gray-700/30 backdrop-blur-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-verde-300 animate-pulse-slow" : "bg-red-400"
                }`}
              ></div>
              <span className="text-xs text-verde-100 dark:text-gray-300">
                {isConnected
                  ? "Recibiendo datos en tiempo real"
                  : "Sin conexión con Arduino"}
              </span>
            </div>
            <div className="text-xs text-verde-100/70 dark:text-gray-500">
              v1.0.0 | AgroClima Vega
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
