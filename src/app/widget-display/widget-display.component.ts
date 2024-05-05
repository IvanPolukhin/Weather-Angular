import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetApiService } from '../widget-api.service';
import { IWidgetData } from '../weather.model';
import { WidgetComponent } from '../widget/widget.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-widget-display',
  standalone: true,
  imports: [CommonModule, WidgetComponent, FormsModule],
  templateUrl: './widget-display.component.html',
  styleUrl: './widget-display.component.css'
})
export class WidgetDisplayComponent {
  widgets: IWidgetData[] = [];
  cityName: string = '';

  constructor(private widgetApiService: WidgetApiService) { }

  addWidget(): void {
    this.widgetApiService.getWeatherByCityName(this.cityName).subscribe((data: IWidgetData) => {
      this.widgets.push(data);
    });
  }

  removeLast(): void {
    this.widgets.pop();
  }

  reset(): void {
    this.widgets = [];
  }
}
