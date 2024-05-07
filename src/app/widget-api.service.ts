import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './environment';
import { API_CONFIG } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class WidgetApiService {
  private apiKey = environment.openWeatherMapApiKey;
  private baseUrl = API_CONFIG.openWeatherMapBaseUrl;

  constructor(private http: HttpClient) { }

  getCities(cityName: string): Observable<string[]> {
    const apiUrl = 'http://api.geonames.org/searchJSON';
    const params = new HttpParams()
      .set('name_startsWith', cityName)
      .set('maxRows', '10')
      .set('username', 'p1m228');

    return this.http.get(apiUrl, { params }).pipe(
      map((response: any) => {
        return response.geonames.map((city: any) => city.name);
      })
    );
  }
  getWeatherByCityName(cityName: string): Observable<any> {
    const apiUrl = `${this.baseUrl}/weather`;
    const params = new HttpParams()
      .set('q', cityName)
      .set('appid', this.apiKey)
      .set('units', 'metric');
    return this.http.get(apiUrl, { params });
  }
}
