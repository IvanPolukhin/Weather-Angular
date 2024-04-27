import { Component } from '@angular/core';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  currentCity: string = 'City';
  currentTemperature: number = 20;
  currentHumidity: number = 50;
  currentWindSpeed: number = 10;
  currentWeatherCondition: string = 'Sunny';
}
