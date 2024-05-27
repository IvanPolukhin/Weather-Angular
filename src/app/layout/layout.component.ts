import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { WeatherComponent } from '../weather/weather.component';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatBadgeModule, MatButtonModule, MatMenuModule, WeatherComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  @ViewChild('drawer') sidenav!: MatDrawer;

  constructor(public themeService: ThemeService) { }

  toggleTheme(isDarkTheme: boolean): void {
    this.themeService.darkTheme = isDarkTheme;
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}