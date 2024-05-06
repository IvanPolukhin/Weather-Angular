import { Component } from '@angular/core';
import { WidgetApiService } from '../widget-api.service';
import { IWidgetData } from '../weather.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {
  cityName: string = '';
  weatherData: IWidgetData | null = null;

  constructor(private weatherService: WidgetApiService) { }

  searchCityWeather(): void {
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