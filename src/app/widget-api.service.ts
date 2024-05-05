import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class WidgetApiService {
  private apiKey = environment.openWeatherMapApiKey;

  constructor(private http: HttpClient) { }

  getWeatherByCityName(cityName: string): Observable<any> {
    const apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
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
          icon: response.weather[0].icon
        };
      })
    );
  }
}
