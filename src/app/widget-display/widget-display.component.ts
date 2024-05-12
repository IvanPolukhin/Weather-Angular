import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { WidgetComponent } from '../widget/widget.component';
import { IWidget } from '../weather.model';
import { WidgetApiService } from '../widget-api.service';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-widget-display',
  standalone: true,
  imports: [WidgetComponent, CommonModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './widget-display.component.html',
  styleUrl: './widget-display.component.css'
})
export class WidgetDisplayComponent {
  myControl = new FormControl();
  widgets: IWidget[] = [];
  filteredOptions: Observable<string[]>;
  cities: string[] = [];

  currentIndex = 0;
  showPrevButton = false;
  showNextButton = false;

  constructor(private widgetApiService: WidgetApiService) {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.updateButtonVisibility();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(option => option.toLowerCase().includes(filterValue));
  }

  getWeather(city: string): void {
    this.widgetApiService.getWeatherForWidget(city).subscribe((widgetData: IWidget) => {
      this.widgets.push(widgetData);
      this.updateButtonVisibility();
    });
  }

  closeWidget(index: number): void {
    this.widgets.splice(index, 1);
    this.updateButtonVisibility();
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
    this.showPrevButton = this.widgets.length > 3;
    this.showNextButton = this.widgets.length > 3;
  }
}