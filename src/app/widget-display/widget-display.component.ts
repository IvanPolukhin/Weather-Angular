import { Component } from '@angular/core';

@Component({
  selector: 'app-widget-display',
  standalone: true,
  imports: [],
  templateUrl: './widget-display.component.html',
  styleUrl: './widget-display.component.css'
})
export class WidgetDisplayComponent {
  widgets: any[] = [{}, {}, {}]; // Инициализируем массив тремя пустыми объектами

  // Метод для добавления нового виджета
  addWidget(): void {
    this.widgets.push({});
  }

  // Метод для удаления последнего виджета
  removeLast(): void {
    this.widgets.pop();
  }

  // Метод для сброса виджетов
  reset(): void {
    this.widgets = [{}, {}, {}];
  }
}
