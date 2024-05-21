import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IWidget } from './weather.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetStorageService {
  private localStorageKey = 'savedWidgets';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  saveWidget(widget: IWidget): Observable<void> {
    if (isPlatformBrowser(this.platformId)) {
      let savedWidgets: IWidget[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
      savedWidgets.push(widget);
      localStorage.setItem(this.localStorageKey, JSON.stringify(savedWidgets));
    }
    return of(undefined);
  }

  loadAllWidgets(): Observable<IWidget[]> {
    if (isPlatformBrowser(this.platformId)) {
      return of(JSON.parse(localStorage.getItem(this.localStorageKey) || '[]'));
    } else {
      return of([]);
    }
  }
}
