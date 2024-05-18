import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { WeatherComponent } from './weather/weather.component';
import { WidgetDisplayComponent } from './widget-display/widget-display.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', component: WeatherComponent },
            { path: 'widgets', component: WidgetDisplayComponent }
        ]
    }
];
