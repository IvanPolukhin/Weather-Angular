import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment';
import { API_CONFIG } from './api.config';
import { IWeatherData } from './weather.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private apiKey = environment.openWeatherMapApiKey;
  private baseUrl = API_CONFIG.openWeatherMapBaseUrl;

  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: number, lon: number): Observable<IWeatherData> {
    const apiUrl = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get<IWeatherData>(apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching weather data:', error);
        throw error;
      })
    );
  }
}
