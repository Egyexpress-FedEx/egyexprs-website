import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, provideRouter } from '@angular/router';
import { AuthState } from '../stats/auth-state';
import { authGuard, guestGuard } from './auth.guard';

describe('Account route guards', () => {
  let loggedIn = false;
  beforeEach(() => {
    loggedIn = false;
    TestBed.configureTestingModule({ providers: [provideRouter([]), {
      provide: AuthState, useValue: { isLoggedIn: () => loggedIn },
    }] });
  });
  const run = (guard: typeof authGuard) => TestBed.runInInjectionContext(() =>
    guard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));

  it('redirects guests to login for a protected route', () => {
    expect(run(authGuard)).toEqual(TestBed.inject(Router).createUrlTree(['/login']));
  });
  it('allows signed in accounts through the auth guard', () => {
    loggedIn = true;
    expect(run(authGuard)).toBe(true);
  });
  it('allows guests to open login', () => { expect(run(guestGuard)).toBe(true); });
  it('redirects signed in accounts from login to home', () => {
    loggedIn = true;
    expect(run(guestGuard)).toEqual(TestBed.inject(Router).createUrlTree(['/home']));
  });
});
