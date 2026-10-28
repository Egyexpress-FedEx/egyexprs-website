
import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthState } from './shared/stats/auth-state';
import { authGuard, guestGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {path:'' , redirectTo:'home' , pathMatch:'full'},
    //Public routes
    {
        path:'home',
        loadComponent: () => import('./features/puplic/pages/home/home').then(c => c.Home),
        children: [{
            path: 'rate',
            loadComponent: () => import('./features/core-features/rating/rate-modal/rate-modal').then(c => c.RateModal),
            children: [
                { path: '', redirectTo: () => inject(AuthState).isInternationalAccount() ? 'international' : 'domestic', pathMatch: 'full' },
                { path: 'domestic', loadComponent: () => import('./features/core-features/rating/domestic/dom-rate/dom-rate').then(c => c.DomRate) },
                { path: 'international', loadComponent: () => import('./features/core-features/rating/international/int-rate/int-rate').then(c => c.IntRate) },
            ],
        }]
    },

    {
        path: 'rate',
        canActivate: [authGuard],
        loadComponent: () => import('./features/core-features/rating/page/rate-page/rate-page').then(c => c.RatePage)
    },
    //Auth routes 
    {
        path:'login',
        canActivate: [guestGuard],
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
