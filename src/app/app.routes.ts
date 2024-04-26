import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { WidgetsComponent } from './widgets/widgets.component'

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: LayoutComponent },
    { path: 'widgets', component: WidgetsComponent },
];
