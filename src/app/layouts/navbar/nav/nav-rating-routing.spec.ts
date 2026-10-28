import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from '../../../app';
import { routes } from '../../../app.routes';
import { Nav } from './nav';
import { AuthState } from '../../../shared/stats/auth-state';
import { By } from '@angular/platform-browser';

describe('Guest rate navigation from the navbar', () => {
  it('opens the domestic rate dialog on home from another page', async () => {
    const original = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal');
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function(this: HTMLDialogElement) { this.setAttribute('open', ''); } });
    try {
      await TestBed.configureTestingModule({ imports: [App], providers: [provideRouter(routes), provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
      TestBed.inject(AuthState).clearCredentials();
      const fixture = TestBed.createComponent(App);
      const router = TestBed.inject(Router);
      await router.navigateByUrl('/login');
      await fixture.whenStable();
      const nav = fixture.debugElement.query(By.directive(Nav)).componentInstance as Nav;
      nav.activeMenu.set('shipping');
      fixture.detectChanges();
      const link = fixture.nativeElement.querySelector('#panel-shipping .menu-action') as HTMLAnchorElement;
      expect(link.getAttribute('href')).toBe('/home/rate/domestic');
      link.click();
      await fixture.whenStable();
      expect(router.url).toBe('/home/rate/domestic');
      expect(fixture.nativeElement.querySelector('dialog.rate-dialog[open]')).not.toBeNull();
      fixture.destroy();
    } finally {
      if (original) Object.defineProperty(HTMLDialogElement.prototype, 'showModal', original);
      else Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal');
    }
  });
});
