import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'' , redirectTo:'home' , pathMatch:'full'},
    //Public routes
    {
        path:'home',
        loadComponent: () => import('./features/puplic/pages/home/home').then(c => c.Home)
    },

    //Auth routes 
    {
        path:'login',
        loadComponent: () => import('./features/identity/Auth/login/login').then(c => c.Login)
    }
];
