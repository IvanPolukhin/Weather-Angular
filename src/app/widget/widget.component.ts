import { Component } from '@angular/core';
import { WidgetApiService } from '../widget-api.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { startWith, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, FormsModule],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {
  cityName = new FormControl();
  weatherData: any;
  filteredCities: string[] = [];

  constructor(private weatherService: WidgetApiService) {
    this.cityName.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.weatherService.getCities(value))
    ).subscribe(cities => {
      this.filteredCities = cities;
    });
  }

  displayFn(city: string): string {
    return city;
  }

  searchCityWeather(): void {
    const selectedCity = this.cityName.value;
    if (selectedCity) {
      this.weatherService.getWeatherByCityName(selectedCity).subscribe(
        (data) => {
          this.weatherData = data;
        },
        (error) => {
          console.error('Error fetching weather data:', error);
        }
      );
    }
  }
}