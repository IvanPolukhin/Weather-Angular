import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

  private getCurrentPosition(observer: Observer<IPosition>): void {
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

  private handlePosition(position: IPosition): void {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    this.fetchWeather(lat, lon);
  }

  private fetchWeather(lat: number, lon: number): void {
    this.weatherApiService.getCurrentWeather(lat, lon).subscribe(
      (data: IWeatherData) => {
        this.updateCurrentWeather(data);
      }
    );
  }

  private updateCurrentWeather(data: IWeatherData): void {
    this.currentWeather = this.weatherMappingService.mapWeatherData(data);
    console.log(this.currentWeather);
  }

  private handleError(error: any): void {
    console.error('Error getting current position:', error);
  }
}