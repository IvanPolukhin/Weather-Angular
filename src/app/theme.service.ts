import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkTheme = false;

  toggleTheme(): void {
    this.darkTheme  = !this.darkTheme ;
  }
}
