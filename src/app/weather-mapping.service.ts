import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherMappingService {

  constructor() { }

  mapWeatherData(data: any): any {
    return {
      city: data.name,
      currentTemperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      weatherCondition: data.weather[0].description
    };
  }
}
