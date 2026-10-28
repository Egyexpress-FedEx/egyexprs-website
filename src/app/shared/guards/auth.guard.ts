import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../stats/auth-state';

export const authGuard: CanActivateFn = () =>
  inject(AuthState).isLoggedIn() || inject(Router).createUrlTree(['/login']);

export const guestGuard: CanActivateFn = () =>
  !inject(AuthState).isLoggedIn() || inject(Router).createUrlTree(['/home']);
