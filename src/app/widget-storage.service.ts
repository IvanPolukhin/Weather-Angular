import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IWidget } from './weather.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetStorageService {
  private localStorageKey = 'savedWidgets';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  saveWidgets(widgets: IWidget[]): Observable<void> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.localStorageKey, JSON.stringify(widgets));
      } catch (error) {
        console.error('Error saving widgets to localStorage', error);
      }
    }
    return of(undefined);
  }

  loadAllWidgets(): Observable<IWidget[]> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const widgets = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
        return of(widgets);
      } catch (error) {
        console.error('Error loading widgets from localStorage', error);
        return of([]);
      }
    } else {
      return of([]);
    }
  }
}
