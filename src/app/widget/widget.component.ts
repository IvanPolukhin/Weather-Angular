import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IWidget } from '../weather.model';
import { WidgetApiService } from '../widget-api.service';
import { Subscription } from 'rxjs';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss'
})
export class WidgetComponent implements OnDestroy {
  @Input() weatherData!: IWidget;
  @Input() isDarkTheme: boolean = false;
  weatherSubscription: Subscription | undefined;

  constructor(
    private widgetApiService: WidgetApiService,
    public themeService: ThemeService,
  ) { }

  refreshWeather(): void {
    this.weatherSubscription = this.widgetApiService.getWeatherForWidget(this.weatherData.cityName)
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