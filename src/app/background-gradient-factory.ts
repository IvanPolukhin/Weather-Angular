import { TimeOfDay } from './time-of-day.enum';

export class BackgroundGradientFactory {
    static getBackgroundGradient(timeOfDay: TimeOfDay): string {
        switch (timeOfDay) {
            case TimeOfDay.Morning:
                return 'linear-gradient(to bottom, #FFD700, #87CEEB)';
            case TimeOfDay.Afternoon:
                return 'linear-gradient(to bottom, #87CEEB, #00FF7F)';
            case TimeOfDay.Evening:
                return 'linear-gradient(to bottom, #FFA500, #FF4500)';
            case TimeOfDay.Night:
            default:
                return 'linear-gradient(to bottom, #191970, #000000)';
        }
    }

    static getTimeOfDay(hour: number): TimeOfDay {
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
}
