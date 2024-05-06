import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IWidgetData } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetMappingService {
  private widgets: BehaviorSubject<IWidgetData[]> = new BehaviorSubject<IWidgetData[]>([]);

  constructor() { }

  getWidgets(): Observable<IWidgetData[]> {
    return this.widgets.asObservable();
  }

  addWidget(widget: IWidgetData): void {
    const currentWidgets = this.widgets.getValue();
    this.widgets.next([...currentWidgets, widget]);
  }

  removeLastWidget(): void {
    const currentWidgets = this.widgets.getValue();
    currentWidgets.pop();
    this.widgets.next(currentWidgets);
  }

  resetWidgets(): void {
    this.widgets.next([]);
  }
}
