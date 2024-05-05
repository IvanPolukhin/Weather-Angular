import { Component } from '@angular/core';
import { WidgetApiService } from '../widget-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {
  cityName: string = '';
  weatherData: any;

  constructor(private weatherService: WidgetApiService,
  ) { }

  searchCityWeather() {
    if (this.cityName) {
      this.weatherService.getWeatherByCityName(this.cityName).subscribe(
        (data) => {
          this.weatherData = data;
        },
        (error) => {
          console.error('Error fetching weather data:', error);
        }
      );
    }
  }
}