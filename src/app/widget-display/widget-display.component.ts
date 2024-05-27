import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IWidget } from '../weather.model';
import { WidgetComponent } from '../widget/widget.component';
import { WidgetApiService } from '../widget-api.service';
import { WidgetStorageService } from '../widget-storage.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-widget-display',
  standalone: true,
  imports: [WidgetComponent, CommonModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './widget-display.component.html',
  styleUrl: './widget-display.component.scss'
})
export class WidgetDisplayComponent implements OnInit, OnDestroy {
  myControl = new FormControl();
  widgets: IWidget[] = [];
  filteredOptions: Observable<string[]> = new Observable<string[]>();
  cities: string[] = [];

  currentIndex: number = 0;
  showButtons: boolean = false;

  weatherSubscription: Subscription | undefined;

  constructor(
    private widgetApiService: WidgetApiService,
    private widgetStorageService: WidgetStorageService,
    public themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.widgetStorageService.loadAllWidgets().subscribe((widgets: IWidget[]) => {
      this.widgets = widgets;
      this.updateButtonVisibility();
    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

  getWeather(city: string): void {
    this.weatherSubscription = this.widgetApiService.getWeatherForWidget(city).subscribe((widgetData: IWidget) => {
      this.widgets.push(widgetData);
      this.updateButtonVisibility();
      this.saveWidgets();
    });
  }

  getWeatherOnEnter(): void {
    const city = this.myControl.value;
    if (city) {
      this.getWeather(city)
    }
  }

  closeWidget(index: number): void {
    this.widgets.splice(index, 1);
    this.updateButtonVisibility();
    this.saveWidgets();
  }

  nextWidget(): void {
    if (this.currentIndex === this.widgets.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.updateButtonVisibility();
  }

  prevWidget(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.widgets.length - 1;
    } else {
      this.currentIndex--;
    }
    this.updateButtonVisibility();
  }

  updateButtonVisibility(): void {
    this.showButtons = this.widgets.length > 3;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(option => option.toLowerCase().includes(filterValue));
  }

  private saveWidgets(): void {
    this.widgetStorageService.saveWidgets(this.widgets).subscribe();
  }
}