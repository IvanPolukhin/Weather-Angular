import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WidgetComponent } from '../widget/widget.component';
import { IWidgetData } from '../weather.model';
import { WidgetApiService } from '../widget-api.service';
import { WidgetMappingService } from '../widget-mapping.service';

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

  constructor(private widgetMappingService: WidgetMappingService) { }

  ngOnInit(): void {
    this.widgetMappingService.getWidgets().subscribe(widgets => {
      this.widgets = widgets;
    });
  }

  addWidget(): void {
    this.widgetMappingService.addWidget({
      city: this.cityName,
      temperature: 0,
      condition: '',
      icon: '',
      minTemperature: 0,
      maxTemperature: 0
    });
  }

  removeLast(): void {
    this.widgetMappingService.removeLastWidget();
  }

  reset(): void {
    this.widgetMappingService.resetWidgets();
  }
}
