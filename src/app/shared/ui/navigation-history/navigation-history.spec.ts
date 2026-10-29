import { TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NavigationHistory } from './navigation-history';

describe('NavigationHistory', () => {
  let events: Subject<NavigationStart | NavigationEnd>;
  let history: NavigationHistory;
  let backCalls: number;
  let destination: string;
  let replace: boolean;

  beforeEach(() => {
    events = new Subject();
    backCalls = 0;
    destination = '';
    replace = false;
    TestBed.configureTestingModule({ providers: [
      { provide: Router, useValue: {
        events, currentNavigation: () => ({ extras: { replaceUrl: replace } }),
        navigateByUrl: (url: string) => { destination = url; return Promise.resolve(true); },
      } },
      { provide: Location, useValue: { back: () => backCalls++ } },
    ] });
    history = TestBed.inject(NavigationHistory);
  });

  function navigate(id: number, url: string, restoredId?: number): void {
    events.next(new NavigationStart(id, url, restoredId === undefined ? 'imperative' : 'popstate',
      restoredId === undefined ? null : { navigationId: restoredId }));
    events.next(new NavigationEnd(id, url, url));
  }

  it('returns direct visitors home without leaving the website', () => {
    navigate(1, '/shipping/pickups/schedule');
    history.back();
    expect(destination).toBe('/home');
    expect(backCalls).toBe(0);
  });

  it('preserves the exact previous URL and uses browser back', () => {
    navigate(1, '/home?source=menu#services');
    navigate(2, '/shipping/pickups/schedule');
    expect(history.previous()?.url).toBe('/home?source=menu#services');
    expect(history.recent()[0].label).toBe('Home');
    history.back();
    expect(backCalls).toBe(1);
  });

  it('tracks browser back, forward and a new branch correctly', () => {
    navigate(1, '/home');
    navigate(2, '/rate');
    navigate(3, '/shipping/pickups/schedule');
    navigate(4, '/rate', 2);
    expect(history.previous()?.url).toBe('/home');
    navigate(5, '/shipping/pickups/schedule', 3);
    expect(history.previous()?.url).toBe('/rate');
    navigate(6, '/rate', 4);
    navigate(7, '/open-account');
    expect(history.previous()?.url).toBe('/rate');
    expect(history.recent().some(item => item.url === '/open-account')).toBe(false);
  });

  it('does not add replaced routes to the back stack', () => {
    navigate(1, '/home');
    navigate(2, '/login');
    replace = true;
    navigate(3, '/shipping/pickups/schedule');
    expect(history.previous()?.url).toBe('/home');
  });
});
