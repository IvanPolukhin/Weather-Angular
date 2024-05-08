import { Injectable } from '@angular/core';
import { IWidget } from './weather.model';
import { IOpenWeatherMapResponse } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetMappingService {

  constructor() { }

  mapWeatherDataToWidget(data: IOpenWeatherMapResponse): IWidget {
    const widget: IWidget = {
      cityName: data.name,
      temperature: Math.round(data.main.temp),
      weatherCondition: data.weather[0].main,
      maxTemperature: Math.round(data.main.temp_max),
      minTemperature: Math.round(data.main.temp_min)
    };
    return widget;
  }
}
