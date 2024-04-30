import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherMappingService } from '../weather-mapping.service';
import { WeatherApiService } from '../weather-api.service';
import { IWeatherModel } from '../weather.model';
import { IWeatherData } from '../weather.model';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit, OnDestroy {
  currentWeather: IWeatherModel = {
    city: '',
    currentTemperature: 0,
    humidity: 0,
    windSpeed: 0,
    weatherCondition: ''
  };
  private geolocationSubscription: Subscription | undefined;

  constructor(
    private weatherApiService: WeatherApiService,
    private weatherMappingService: WeatherMappingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.geolocationSubscription = this.getGeolocation();
    }
  }

  ngOnDestroy(): void {
    if (this.geolocationSubscription) {
      this.geolocationSubscription.unsubscribe();
    }
  }

  private getGeolocation(): Subscription {
    return new Observable<{ coords: { latitude: number, longitude: number } }>((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          observer.next(position);
          observer.complete();
        }, (error) => {
          observer.error(error);
        });
      } else {
        observer.error('Geolocation is not supported or permission is denied.');
      }
    }).subscribe((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      this.weatherApiService.getCurrentWeather(lat, lon).subscribe((data: IWeatherData) => {
        this.currentWeather = this.weatherMappingService.mapWeatherData(data);
        console.log(this.currentWeather);
      }, (error: any) => {
        console.error('Error fetching weather data:', error);
      });
    }, (error) => {
      console.error('Error getting current position:', error);
    });
  }
}
