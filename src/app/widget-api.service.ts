import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_CONFIG } from './api.config';
import { IWidget } from './weather.model';
import { IOpenWeatherMapResponse } from './weather.model';
import { environment } from './environment';
import { WidgetMappingService } from './widget-mapping.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetApiService {
  private apiKey = environment.openWeatherMapApiKey;
  private baseUrl = API_CONFIG.openWeatherMapBaseUrl;

  constructor(
    private http: HttpClient,
    private widgetMappingService: WidgetMappingService
  ) { }

  getWeatherForWidget(city: string): Observable<IWidget> {
    const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url).pipe(
      map((data: IOpenWeatherMapResponse) => this.widgetMappingService.mapWeatherDataToWidget(data))

    );
  }
}
