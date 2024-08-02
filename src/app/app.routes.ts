import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', title: 'Simple CRM', component: DashboardComponent},
    {path: 'user', title: 'User', component: UserComponent},
    {path: 'dashboard', title: 'Dashboard', component: DashboardComponent},
];
