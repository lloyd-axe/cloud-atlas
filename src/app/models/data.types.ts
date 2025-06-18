export interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
  weather: string;
}

export interface WeatherForecastData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    relativehumidity_2m: string;
    direct_radiation: string;
    temperature_2m: string;
  };
  hourly: {
    time: string[];
    relativehumidity_2m: (number | null)[];
    direct_radiation: (number | null)[];
    temperature_2m: (number | null)[];
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: (number | null)[];
    temperature_2m_min: (number | null)[];
  };
}
