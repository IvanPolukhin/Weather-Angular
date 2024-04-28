import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { HttpClientModule } from '@angular/common/http';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  currentCity: string = '';
  currentTemperature: number = 0;
  currentHumidity: number = 0;
  currentWindSpeed: number = 0;
  currentWeatherCondition: string = '';

  constructor(
    private weatherService: WeatherService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.weatherService.getCurrentWeather(lat, lon).subscribe((data: any) => {
          this.currentCity = data.name;
          this.currentTemperature = Math.round(this.convertKelvinToCelsius(data.main.temp));
          this.currentHumidity = data.main.humidity;
          this.currentWindSpeed = data.wind.speed;
          this.currentWeatherCondition = data.weather[0].description;
        });
      });
    }
  }


  convertKelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }

}
