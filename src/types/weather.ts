export interface WeatherData {
  id: string;
  timestamp: Date;
  temperature: number;
  humidity: number;
  pressure: number;
  uvIndex: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  lightLevel: number;
}

export interface Station {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
}

export interface WeatherAlert {
  id: string;
  type: "temperature" | "humidity" | "pressure" | "uv" | "wind";
  severity: "low" | "medium" | "high";
  message: string;
  timestamp: Date;
  isActive: boolean;
}

export interface Forecast {
  date: Date;
  temperature: {
    min: number;
    max: number;
  };
  humidity: number;
  precipitation: number;
  description: string;
  icon: string;
}
