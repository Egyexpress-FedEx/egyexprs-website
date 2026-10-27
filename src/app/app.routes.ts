
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
    },
    {
        path:'register',
        loadComponent: () => import('./features/identity/Auth/registretion/registretion').then(c => c.Registretion)
    },
    {
        path:'open-account',
        loadComponent: () => import('./features/identity/Auth/oper-account/oper-account').then(c => c.OperAccount)
    },
];
