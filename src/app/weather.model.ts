export interface IWeatherModel {
  city: string;
  currentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCondition: string;
}

export interface IWeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
  }[];
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface IPosition {
  coords: ICoordinates;
}

export interface IWidget {
  cityName: string;
  temperature: number;
  weatherCondition: string;
  maxTemperature: number;
  minTemperature: number;
}

export interface IOpenWeatherMapResponse {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}