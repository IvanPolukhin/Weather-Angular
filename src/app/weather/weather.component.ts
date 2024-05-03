import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { IWeatherModel } from '../weather.model';
import { IWeatherData } from '../weather.model';
import { IPosition } from '../weather.model';

import { WeatherMappingService } from '../weather-mapping.service';
import { WeatherApiService } from '../weather-api.service';
import { Subscription, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
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
  geolocationSubscription: Subscription | undefined;
  backgroundGradient: string = '';

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

  getGeolocation(): Subscription {
    return new Observable<IPosition>((observer) => {
      if ('geolocation' in navigator) {
        this.getCurrentPosition(observer);
      } else {
        observer.error('Geolocation is not supported or permission is denied.');
      }
    }).subscribe((position) => {
      this.handlePosition(position);
    }, (error) => {
      this.handleError(error);
    });
  }

  getCurrentPosition(observer: Observer<IPosition>): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        observer.next(position);
        observer.complete();
      },
      (error) => {
        observer.error(error);
      }
    );
  }

  handlePosition(position: IPosition): void {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    this.fetchWeather(lat, lon);
  }

  fetchWeather(lat: number, lon: number): void {
    this.weatherApiService.getCurrentWeather(lat, lon).subscribe(
      (data: IWeatherData) => {
        this.updateCurrentWeather(data);
      }
    );
  }

  updateCurrentWeather(data: IWeatherData): void {
    this.currentWeather = this.weatherMappingService.mapWeatherData(data);
    console.log(this.currentWeather);

    const currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 12) {
      this.backgroundGradient = 'linear-gradient(to bottom, #FFD700, #87CEEB)'; // Morning background
    } else if (currentTime >= 12 && currentTime < 18) {
      this.backgroundGradient = 'linear-gradient(to bottom, #87CEEB, #00FF7F)'; // Afternoon background
    } else if (currentTime >= 18 && currentTime < 24) {
      this.backgroundGradient = 'linear-gradient(to bottom, #FFA500, #FF4500)'; // Evening background
    } else {
      this.backgroundGradient = 'linear-gradient(to bottom, #191970, #000000)'; // Night background
    }
  }

  handleError(error: any): void {
    console.error('Error getting current position:', error);
  }
}
