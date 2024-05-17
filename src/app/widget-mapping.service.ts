import { Injectable } from '@angular/core';
import { IWidget, IOpenWeatherMapResponse } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetMappingService {

  constructor() { }

  mapWeatherDataToWidget(data: IOpenWeatherMapResponse): IWidget {
    return {
      cityName: data.name,
      temperature: Math.round(data.main.temp),
      weatherCondition: data.weather[0].main,
      maxTemperature: Math.round(data.main.temp_max),
      minTemperature: Math.round(data.main.temp_min),
      description: data.weather[0].description
    };
  }
}
