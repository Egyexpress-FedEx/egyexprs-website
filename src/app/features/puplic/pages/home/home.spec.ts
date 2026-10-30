import { AuthState } from '../../../../shared/stats/auth-state';
import { Footer } from '../../../../layouts/footer/footer';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [Home],
    }).compileComponents();

    TestBed.inject(AuthState).clearCredentials();
    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('keeps the home rate shortcut on the dialog route for both guests and signed-in users', async () => {
    const rateLink = () => [...fixture.nativeElement.querySelectorAll('a.shipment-service')].find((link: unknown) => (link as HTMLAnchorElement).textContent?.includes('CHECK SHIPPING RATE')) as HTMLAnchorElement;
    expect(rateLink().getAttribute('href')).toBe('/home/rate');
    const auth = TestBed.inject(AuthState);
    void auth.setCredentials({ CoCode: 'A', DivCode: '', ShipmentType: 'D', UserID: 'user', UserPWD: 'password', UserName: 'User', UserTag: '', UserType: '' });
    fixture.detectChanges(); expect(rateLink().getAttribute('href')).toBe('/home/rate');
    auth.clearCredentials();
  });
  it('links both home and footer account actions to the existing account page', async () => {
    expect(fixture.nativeElement.querySelector('.account-banner-button').getAttribute('href')).toBe('/open-account');
    const footer = TestBed.createComponent(Footer); await footer.whenStable();
    const link = [...footer.nativeElement.querySelectorAll('a')].find((element: unknown) => (element as HTMLAnchorElement).textContent?.includes('Open an Account')) as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/open-account'); footer.destroy();
  });

});
