import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.openWeatherMapApiKey;

  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: number, lon: number) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
