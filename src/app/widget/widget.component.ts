import { Component, Input, OnDestroy } from '@angular/core';
import { IWidget } from '../weather.model';
import { WidgetApiService } from '../widget-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent implements OnDestroy {
  @Input() weatherData!: IWidget;
  weatherSubscription: Subscription | undefined;

  constructor(private widgetApiService: WidgetApiService) { }

  refreshWeather(): void {
    this.widgetApiService.getWeatherForWidget(this.weatherData.cityName)
      .subscribe((widgetData: IWidget) => {
        this.weatherData = widgetData;
      });
  }

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}