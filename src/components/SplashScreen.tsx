import React, { useState, useEffect } from "react";
import {
  Activity,
  ArrowRight,
  Leaf,
  BarChart3,
  MapPin,
  Shield,
} from "lucide-react";
import viveroImage from "../assets/vivero.jpg";

interface SplashScreenProps {
  onStart: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const heroTexts = [
    "Manage your orchards and nurseries with advanced technology",
    "Take control from wherever you are",
    "24/7 smart monitoring",
    "Optimize your agricultural production",
  ];

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-Time Analysis",
      description: "Precise temperature, humidity data and more",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Geolocation",
      description: "Exact location of your monitoring stations",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Smart Alerts",
      description: "Automatic notifications to protect your crops",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sustainability",
      description: "Optimize resources and care for the environment",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroTexts.length]);

  const handleStart = () => {
    setIsLoading(true);
    setTimeout(() => {
      onStart();
    }, 1500);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-verde-50 via-white to-cielo-50 dark:from-gray-900 dark:via-gray-800 dark:to-verde-900">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0">
        <img
          src={viveroImage}
          alt="Vivero"
          className="object-cover w-full h-full opacity-20 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-verde-600/20 via-transparent to-verde-800/30 dark:from-gray-900/40 dark:to-gray-900/60"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header con logo */}
        <header className="p-6 sm:p-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 shadow-lg bg-verde-600 dark:bg-verde-500 rounded-xl">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl text-verde-800 dark:text-verde-200">
                AgroClima Vega
              </h1>
              <p className="text-sm text-verde-600 dark:text-verde-400">
                La Vega, Dominican Republic
              </p>
            </div>
          </div>
        </header>

        {/* Contenido central */}
        <main className="flex items-center justify-center flex-1 px-6 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Sección de textos principales */}
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
                    Revolution
                    <span className="block text-verde-600 dark:text-verde-400">
                      Agricultural
                    </span>
                    Intelligent
                  </h2>

                  {/* Texto rotativo */}
                  <div className="flex items-center justify-center h-16 lg:justify-start">
                    <p className="text-xl text-gray-700 transition-all duration-500 ease-in-out sm:text-2xl dark:text-gray-300">
                      {heroTexts[currentTextIndex]}
                    </p>
                  </div>
                </div>

                {/* Botón principal */}
                <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                  <button
                    onClick={handleStart}
                    disabled={isLoading}
                    className="flex items-center justify-center px-8 py-4 space-x-2 font-semibold text-white transition-all duration-300 transform shadow-lg group bg-gradient-to-r from-verde-600 to-verde-700 hover:from-verde-700 hover:to-verde-800 dark:from-verde-500 dark:to-verde-600 dark:hover:from-verde-600 dark:hover:to-verde-700 rounded-xl hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                        <span>Getting started...</span>
                      </>
                    ) : (
                      <>
                        <span>Start Monitoring</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Estadísticas rápidas */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold sm:text-3xl text-verde-600 dark:text-verde-400">
                      24/7
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Monitoring
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold sm:text-3xl text-verde-600 dark:text-verde-400">
                      99.9%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Precision
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold sm:text-3xl text-verde-600 dark:text-verde-400">
                      ∞
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Odds
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección de características */}
              <div className="space-y-6">
                <div className="p-8 border shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border-white/20 dark:border-gray-700/20">
                  <h3 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Main Features
                  </h3>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start p-4 space-x-4 transition-all duration-300 rounded-xl bg-gradient-to-r from-verde-50 to-cielo-50 dark:from-gray-700 dark:to-gray-600 hover:shadow-md group"
                      >
                        <div className="flex-shrink-0 p-2 text-white transition-transform rounded-lg bg-verde-600 dark:bg-verde-500 group-hover:scale-110">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="mb-1 font-semibold text-gray-900 dark:text-white">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Información adicional */}
                <div className="p-6 text-center border bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border-white/20 dark:border-gray-700/20">
                  <p className="mb-2 text-gray-700 dark:text-gray-300">
                    <strong>Connected with Arduino</strong>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Advanced monitoring system for precision agriculture
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-2 text-sm text-gray-600 sm:flex-row sm:space-y-0 sm:space-x-6 dark:text-gray-400">
            <span>© 2025 AgroClima Vega</span>
            <span className="hidden sm:block">•</span>
            <span>Dominican Agricultural Innovation</span>
            <span className="hidden sm:block">•</span>
            <span>v1.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SplashScreen;
