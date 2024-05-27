import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IWeatherModel } from '../weather.model';
import { IWeatherData } from '../weather.model';
import { IPosition } from '../weather.model';
import { WeatherMappingService } from '../weather-mapping.service';
import { WeatherApiService } from '../weather-api.service';
import { BackgroundGradientService } from '../background-gradient-factory.service';
import { Subscription, Observable, Observer, switchMap, interval } from 'rxjs';



@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
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
  weatherUpdateSubscription: Subscription | undefined;
  backgroundGradient: string = '';

  private readonly weatherInterval: number = 10000;

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
    if (this.weatherUpdateSubscription) {
      this.weatherUpdateSubscription.unsubscribe();
    }
  }

  getGeolocation(): Subscription {
    return new Observable<IPosition>((observer) => {
      if ('geolocation' in navigator) {
        this.getCurrentPosition(observer);
      } else {
        observer.error('Geolocation is not supported or access is denied.');
      }
    }).subscribe(
      (position) => this.handlePosition(position),
      (error: any) => this.handleError(error)
    );
  }

  getCurrentPosition(observer: Observer<IPosition>): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        observer.next(position);
        observer.complete();
      },
      (error: any) => {
        observer.error(error);
      }
    );
  }

  handlePosition(position: IPosition): void {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    this.fetchWeather(lat, lon);
    this.weatherUpdateSubscription = interval(this.weatherInterval).pipe(
      switchMap(() => this.weatherApiService.getCurrentWeather(lat, lon))
    ).subscribe(

      (data: IWeatherData) => this.updateCurrentWeather(data),
      (error: any) => this.handleError(error)
    );
  }

  fetchWeather(lat: number, lon: number): void {
    this.weatherApiService.getCurrentWeather(lat, lon).subscribe(
      (data: IWeatherData) => this.updateCurrentWeather(data),
      (error: any) => this.handleError(error)
    );
  }

  updateCurrentWeather(data: IWeatherData): void {
    this.currentWeather = this.weatherMappingService.mapWeatherData(data);

    const currentTime = new Date().getHours();
    const timeOfDay = this.backgroundGradientService.getTimeOfDay(currentTime);
    this.backgroundGradient = this.backgroundGradientService.getBackgroundClass(timeOfDay);
  }

  handleError(error: any): void {
    console.error('An error occurred while receiving the current location:', error);
  }
}
