import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthState } from '../../../../shared/stats/auth-state';
import { PickupBookings } from './pickup-bookings';
import { PickupBooking } from '../interface/pickup-list';

const account = { CoCode: 'ACC01', DivCode: '', ShipmentType: 'D', UserID: 'logged-in-user', UserName: 'User', UserPWD: 'password', UserTag: '', UserType: '', ActiveDataBase: 'integraontrack' };
const booking: PickupBooking = { BookingRefNo: 'S1', CustCode: 'D77777', Status: 'Booking Created', ShipBookingDate: 'Oct 30 2026', BookingTime: '10:00', PickupDate: 'Nov 1 2026', PickupReadyTime: '09:00', PickupBeforeTime: '11:00', Origin: 'BNS', ServiceType: 'PRY' };

describe('PickupBookings account cache', () => {
  let auth: AuthState; let store: PickupBookings; let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    auth = TestBed.inject(AuthState); auth.clearCredentials(); auth.setCredentials(account);
    store = TestBed.inject(PickupBookings); http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => { auth.clearCredentials(); TestBed.tick(); http.verify(); });
  async function load(): Promise<void> {
    const pending = store.loadAll();
    http.expectOne(r => r.url.endsWith('GetAccountDetails')).flush({ Code: '101', CustomerDetails: { cl_CustCode: 'D77777' } });
    await Promise.resolve();
    const query = http.expectOne(r => r.url.endsWith('BookingQuery'));
    expect(query.request.body).toEqual({ AccessCode: 'logged-in-user', ActiveDataBase: 'integraontrack', FilterCondition: " and CustCode = 'D77777'" });
    query.flush({ code: '1', Description: 'SUCCESS', JasonString: JSON.stringify([booking]) });
    await pending;
  }
  it('loads once, shares in-flight requests and keeps successful results in signals', async () => {
    const first = store.loadAll(); expect(store.loadAll()).toBe(first);
    http.expectOne(r => r.url.endsWith('GetAccountDetails')).flush({ Code: '101', CustomerDetails: { cl_CustCode: 'D77777' } });
    await Promise.resolve();
    http.expectOne(r => r.url.endsWith('BookingQuery')).flush({ code: '1', Description: 'SUCCESS', JasonString: JSON.stringify([booking]) });
    await first; await store.loadAll();
    expect(store.bookings()).toEqual([booking]); expect(store.loaded()).toBe(true);
  });
  it('keeps server status results separate from all bookings', async () => {
    await load();
    const pending = store.searchStatus({ from: '2026-10-01', to: '2026-10-30', address: '', number: '', status: 'Collected' }, 'BNS');
    await Promise.resolve();
    const query = http.expectOne(r => r.url.endsWith('BookingQuery'));
    expect(query.request.body.FilterCondition).toContain('PickupDone=1');
    expect(query.request.body.FilterCondition).toContain("Origin = 'BNS'");
    expect(query.request.body.FilterCondition).not.toContain('BookingDate');
    query.flush({ code: '1', Description: 'SUCCESS', JasonString: '[]' }); await pending;
    expect(store.statusBookings()).toEqual([]); expect(store.bookings()).toEqual([booking]);
  });
  it('hides cached records immediately on logout and rejects late responses', async () => {
    await load();
    const pending = store.loadAll(true);
    const query = http.expectOne(r => r.url.endsWith('BookingQuery'));
    auth.clearCredentials();
    expect(store.bookings()).toEqual([]); expect(store.loaded()).toBe(false);
    query.flush({ code: '1', Description: 'SUCCESS', JasonString: JSON.stringify([booking]) }); await pending;
    expect(store.bookings()).toEqual([]);
  });
  it('discards superseded status responses', async () => {
    await load();
    const pending = store.searchStatus({ from: '', to: '', address: '', number: '', status: 'Pending' }, '');
    await Promise.resolve();
    const query = http.expectOne(r => r.url.endsWith('BookingQuery'));
    store.clearStatus();
    query.flush({ code: '1', Description: 'SUCCESS', JasonString: JSON.stringify([booking]) }); await pending;
    expect(store.statusBookings()).toEqual([]); expect(store.statusLoading()).toBe(false);
  });
  it('reloads after a new booking invalidates the cache', async () => {
    await load(); store.invalidate(); expect(store.loaded()).toBe(false); await load();
  });
});
