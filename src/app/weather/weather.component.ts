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

import { BackgroundGradientService } from '../background-gradient-factory.service';

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
    private backgroundGradientService: BackgroundGradientService,
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
        observer.error('Геолокация не поддерживается или доступ запрещен.');
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
    const timeOfDay = this.backgroundGradientService.getTimeOfDay(currentTime);
    this.backgroundGradient = this.backgroundGradientService.getBackgroundClass(timeOfDay);
  }

  handleError(error: any): void {
    console.error('Ошибка при получении текущей позиции:', error);
  }
}