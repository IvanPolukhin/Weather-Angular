import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './environment';
import { IWidgetData } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetApiService {
  private apiKey = environment.openWeatherMapApiKey;
  private baseUrl = 'http://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) { }

  getCities(): Observable<string[]> {
    const apiUrl = `${this.baseUrl}/weather?q=London&appid=${this.apiKey}`;
    return this.http.get(apiUrl).pipe(
      map((response: any) => {
        return [''];
      })
    );
  }

  getWeatherByCityName(cityName: string): Observable<IWidgetData> {
    const apiUrl = `${this.baseUrl}/weather`;
    const params = new HttpParams()
      .set('q', cityName)
      .set('appid', this.apiKey)
      .set('units', 'metric');

    return this.http.get(apiUrl, { params }).pipe(
      map((response: any) => {
        return {
          city: response.name,
          temperature: response.main.temp,
          condition: response.weather[0].description,
          icon: response.weather[0].icon,
          minTemperature: response.main.temp_min,
          maxTemperature: response.main.temp_max
        };
      })
    );
  }
}
