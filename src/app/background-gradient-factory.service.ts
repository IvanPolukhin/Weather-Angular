import { Injectable } from '@angular/core';
import { TimeOfDay } from './time-of-day.enum';

@Injectable({
  providedIn: 'root'
})
export class BackgroundGradientService {

  getTimeOfDay(hour: number): TimeOfDay {
    if (hour >= 6 && hour < 12) {
      return TimeOfDay.Morning;
    } else if (hour >= 12 && hour < 18) {
      return TimeOfDay.Afternoon;
    } else if (hour >= 18 && hour < 24) {
      return TimeOfDay.Evening;
    } else {
      return TimeOfDay.Night;
    }
  }

  getBackgroundClass(timeOfDay: TimeOfDay): string {
    switch (timeOfDay) {
      case TimeOfDay.Morning:
        return 'morning-background';
      case TimeOfDay.Afternoon:
        return 'afternoon-background';
      case TimeOfDay.Evening:
        return 'evening-background';
      case TimeOfDay.Night:
      default:
        return 'night-background';
    }
  }
}
