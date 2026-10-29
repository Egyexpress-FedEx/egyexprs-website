import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulePinkup } from './schedule-pinkup';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthState } from '../../../../shared/stats/auth-state';

describe('SchedulePinkup', () => {
  let component: SchedulePinkup;
  let fixture: ComponentFixture<SchedulePinkup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulePinkup],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    TestBed.inject(AuthState).clearCredentials();
    fixture = TestBed.createComponent(SchedulePinkup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('waits until the customer reaches scheduling before showing the closing popup', async () => {
    const dialog = fixture.nativeElement.querySelector('#cutoff-title').closest('dialog') as HTMLDialogElement;
    dialog.showModal = () => { dialog.open = true; };
    dialog.close = () => { dialog.open = false; };
    component.clock.set({ date: '2026-10-29', time: '15:30' });
    component.setPickupDate('2026-10-29');
    component.address.controls.city.setValue('BNS');
    await fixture.whenStable();
    expect(component.workdayEnded()).toBe(true);
    expect(dialog.open).toBe(false);
    component.activateSchedule();
    await fixture.whenStable();
    expect(dialog.open).toBe(true);
    component.declineNextDay();
    await fixture.whenStable();
    expect(dialog.open).toBe(false);
    expect(fixture.nativeElement.querySelector('input[name="from"]').disabled).toBe(true);
  });

  it('allows editing latest time with at least one hour between the two times', () => {
    component.clock.set({ date: '2026-10-29', time: '10:00' });
    component.setPickupDate('2026-11-01');
    component.address.controls.city.setValue('BNS');
    component.setEarliestTime('14:00');
    component.setLatestTime('14:59');
    expect(component.scheduleError()).toContain('at least one hour');
    component.setLatestTime('15:00');
    expect(component.scheduleError()).toBe('');
    component.setEarliestTime('14:30');
    expect(component.scheduleError()).toContain('at least one hour');
  });

  it('allows exactly two hours past city closing, flags the next minute and rechecks city changes', () => {
    component.clock.set({ date: '2026-10-29', time: '10:00' });
    component.setPickupDate('2026-11-01');
    for (const [city, start, end, invalid] of [['BNS', '15:00', '17:00', '17:01'], ['RAM', '16:00', '18:00', '18:01'], ['CAI', '17:30', '19:30', '19:31']]) {
      component.address.controls.city.setValue(city);
      component.setEarliestTime(start);
      component.setLatestTime(end);
      expect(component.scheduleError()).toBe('');
      component.setLatestTime(invalid);
      expect(component.latestLimitExceeded()).toBe(true);
      expect(component.scheduleError()).toContain('two hours after closing');
      component.closeLatestLimit();
      expect(component.scheduleError()).not.toBe('');
    }
    component.setEarliestTime('14:00');
    component.setLatestTime('18:00');
    component.address.controls.city.setValue('BNS');
    expect(component.latestLimitExceeded()).toBe(true);
    component.setLatestTime('17:00');
    expect(component.scheduleError()).toBe('');
    expect(component.latestLimitExceeded()).toBe(false);
  });

  it('locks today after closing even when the customer declines moving, then unlocks the next day', async () => {
    component.clock.set({ date: '2026-10-29', time: '15:00' });
    component.address.controls.city.setValue('BNS');
    component.setPickupDate('2026-10-29');
    expect(component.workdayEnded()).toBe(false);
    component.clock.set({ date: '2026-10-29', time: '15:01' });
    component.declineNextDay();
    const previousTime = component.earliestTime();
    component.setEarliestTime('14:00');
    expect(component.earliestTime()).toBe(previousTime);
    expect(component.scheduleError()).toContain("Today's booking hours ended");
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('input[name="from"]').disabled).toBe(true);
    expect(fixture.nativeElement.querySelector('.next-working-day')).not.toBeNull();
    component.requestNextWorkingDay();
    component.acceptNextDay();
    await fixture.whenStable();
    expect(component.pickupDate()).toBe('2026-11-01');
    expect(component.earliestTime()).toBe('09:00');
    expect(component.workdayEnded()).toBe(false);
    expect(fixture.nativeElement.querySelector('input[name="from"]').disabled).toBe(false);
    expect(component.scheduleError()).toBe('');
  });

  it('allows booking at each exact cutoff and calculates a two-hour collection window', () => {
    component.clock.set({ date: '2026-10-29', time: '10:17' });
    component.setPickupDate('2026-10-29');
    for (const [city, start, end] of [['BNS', '15:00', '17:00'], ['RAM', '16:00', '18:00'], ['CAI', '17:30', '19:30']]) {
      component.address.controls.city.setValue(city);
      component.setEarliestTime(start);
      expect(component.scheduleError()).toBe('');
      expect(component.latestTime()).toBe(end);
      component.setEarliestTime(start.slice(0, 3) + (Number(start.slice(3)) + 1).toString().padStart(2, '0'));
      expect(component.scheduleError()).toContain('cannot start after');
    }
  });

  it('keeps the date when declined and moves to the next working day only on acceptance', () => {
    component.clock.set({ date: '2026-10-29', time: '15:01' });
    component.setPickupDate('2026-10-29');
    component.address.controls.city.setValue('BNS');
    expect(component.proposedDate()).toBe('2026-11-01');
    component.declineNextDay();
    expect(component.pickupDate()).toBe('2026-10-29');
    expect(component.earliestTime()).toBe('15:01');
    component.acceptNextDay();
    expect(component.pickupDate()).toBe('2026-11-01');
    expect(component.earliestTime()).toBe('09:00');
    expect(component.latestTime()).toBe('11:00');
    component.setEarliestTime('09:15');
    expect(component.latestTime()).toBe('11:15');
    expect(component.scheduleError()).toBe('');
    expect(component.dateNotice()).toBe('');
  });

  it('returns a cutoff-transferred pickup to today when the new city is still open', async () => {
    component.clock.set({ date: '2026-10-29', time: '15:30' });
    component.setPickupDate('2026-10-29');
    component.address.controls.city.setValue('BNS');
    component.acceptNextDay();
    expect(component.pickupDate()).toBe('2026-11-01');
    component.address.controls.city.setValue('CAI');
    await fixture.whenStable();
    expect(component.pickupDate()).toBe('2026-10-29');
    expect(component.earliestTime()).toBe('15:30');
    expect(component.scheduleError()).toBe('');
    expect(component.dateNotice()).toContain('still available today');
    expect(component.returnTodayMessage()).toContain('changed back to today');
    component.closeReturnToday();
    expect(component.returnTodayMessage()).toBe('');
  });

  it('preserves a manually chosen future date and a transfer when the new city is closed', async () => {
    component.clock.set({ date: '2026-10-29', time: '16:30' });
    component.setPickupDate('2026-10-29');
    component.address.controls.city.setValue('BNS');
    component.acceptNextDay();
    component.address.controls.city.setValue('RAM');
    await fixture.whenStable();
    expect(component.pickupDate()).toBe('2026-11-01');
    component.setPickupDate('2026-11-02');
    component.address.controls.city.setValue('CAI');
    await fixture.whenStable();
    expect(component.pickupDate()).toBe('2026-11-02');
  });
  it('starts future dates and early morning bookings at 9:00 and explains weekend changes', () => {
    component.clock.set({ date: '2026-10-29', time: '08:17' });
    component.setPickupDate('2026-10-29');
    expect(component.earliestTime()).toBe('09:00');
    component.clock.set({ date: '2026-10-29', time: '12:17' });
    component.setPickupDate('2026-10-30');
    expect(component.pickupDate()).toBe('2026-11-01');
    expect(component.dateNotice()).toContain('Sunday');
    expect(component.weekendMessage()).toContain('Friday and Saturday are non-working days');
    expect(component.weekendMessage()).toContain('Sunday, 01 November 2026');
    component.closeWeekendNotice();
    expect(component.weekendMessage()).toBe('');
    expect(component.earliestTime()).toBe('09:00');
  });

  it('fills the signed-in account address and selects its city while keeping it editable', async () => {
    TestBed.inject(AuthState).setCredentials({
      CoCode: 'ACC01', DivCode: '', ShipmentType: 'I', UserID: 'pickup-user',
      UserName: 'Pickup User', UserPWD: 'password', UserTag: '', UserType: '',
    });
    fixture.destroy();
    fixture = TestBed.createComponent(SchedulePinkup);
    component = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);
    const accountRequest = http.expectOne(request => request.url.endsWith('GetAccountDetails'));
    expect(accountRequest.request.body.AccountNo).toBe('ACC01');
    component.address.controls.contact.setValue('Edited contact');
    component.address.controls.contact.markAsDirty();
    accountRequest.flush({ Code: '101', CustomerDetails: {
      cl_CustName: 'Test Company', cl_CPerson: 'Original contact', cl_CustAddress: 'Street 1',
      cl_CustAddress1: 'Area', cl_CustCity: 'CAI', cl_CustPhone: '123',
      cl_CustMobile: '456', cl_CustEMail: 'test@example.com',
    } });
    http.expectOne(request => request.url.endsWith('GetCityListFilterWise')).flush({
      Code: '101', Response: [{ cl_CodeID: 'CAI', cl_CodeName: 'Cairo' }, { cl_CodeID: 'ALX', cl_CodeName: 'Alexandria' }],
    });
    await fixture.whenStable();
    expect(component.address.controls.company.value).toBe('Test Company');
    expect(component.address.controls.contact.value).toBe('Edited contact');
    const select = fixture.nativeElement.querySelector('select[name="city"]') as HTMLSelectElement;
    expect(select.value).toBe('CAI');
    select.value = 'ALX';
    select.dispatchEvent(new Event('change'));
    expect(component.address.controls.city.value).toBe('ALX');
    http.verify();
    TestBed.inject(AuthState).clearCredentials();
  });
});
