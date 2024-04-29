import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherMappingService } from '../weather-mapping.service';
import { WeatherApiService } from '../weather-api.service';
import { WeatherModel } from '../weather.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  currentWeather: WeatherModel = {
    city: '',
    currentTemperature: 0,
    humidity: 0,
    windSpeed: 0,
    weatherCondition: ''
  }

  constructor(
    private weatherApiService: WeatherApiService,
    private weatherMappingService: WeatherMappingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchWeatherData();
    }
  }

  async fetchWeatherData(): Promise<void> {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const data = await this.weatherApiService.getCurrentWeather(lat, lon);
          this.currentWeather = this.weatherMappingService.mapWeatherData(data);
          console.log(this.currentWeather);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      });
    } else {
      console.error('Geolocation is not supported or permission is denied.');
    }
  }
}