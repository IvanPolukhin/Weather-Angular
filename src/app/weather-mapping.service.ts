import { Injectable } from '@angular/core';
import { IWeatherData } from './weather.model';
import { IWeatherModel } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherMappingService {

  mapWeatherData(data: IWeatherData): IWeatherModel {
    return {
      city: data.name,
      currentTemperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      weatherCondition: data.weather[0].description
    };
  }
}
