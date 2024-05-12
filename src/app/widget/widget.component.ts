import { Component, Input } from '@angular/core';
import { IWidget } from '../weather.model';
import { WidgetApiService } from '../widget-api.service';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {
  @Input() weatherData!: IWidget;

  constructor(private widgetApiService: WidgetApiService) { }

  refreshWeather(): void {
    this.widgetApiService.getWeatherForWidget(this.weatherData.cityName)
      .subscribe((widgetData: IWidget) => {
        this.weatherData = widgetData;
      });
  }
}