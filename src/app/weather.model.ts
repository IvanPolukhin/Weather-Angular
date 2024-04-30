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
