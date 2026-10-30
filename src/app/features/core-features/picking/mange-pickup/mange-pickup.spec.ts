import { vi } from 'vitest';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import writeXlsxFile from 'write-excel-file/browser';
import { Dropdowns } from '../../rating/service/domestic/dropdowns';
import { PickupBookings } from '../service/pickup-bookings';
import { PickupBooking } from '../interface/pickup-list';
import { MangePickup } from './mange-pickup';
import { cairoClock } from '../schedule-pinkup/pickup-schedule';
const { saveFile } = vi.hoisted(() => ({ saveFile: vi.fn().mockResolvedValue(undefined) }));
vi.mock('write-excel-file/browser', () => ({ default: vi.fn(() => ({ toFile: saveFile })) }));

function sampleBookings(): PickupBooking[] {
  return Array.from({ length: 54 }, (_, index) => {
    const date = new Date(cairoClock().date + 'T12:00:00Z'); date.setUTCDate(date.getUTCDate() - index * 2);
    const created = date.toISOString().slice(0, 10);
    return { BookingRefNo: 'S' + (60090 - index), CustCode: 'D77777', Status: 'Booking Created', ShipBookingDate: created, BookingTime: '10:00', PickupDate: created, PickupReadyTime: '09:00', PickupBeforeTime: '11:00', Origin: ['CAI', 'BNS', 'ALX'][index % 3], ServiceType: 'PRY', SendersName: 'Sender Company', SendersAddress1: 'Street', ReceiversName: 'Receiver ' + index, ReceiversContactPerson: 'Contact ' + index };
  });
}

describe('MangePickup real-data presentation', () => {
  let component: MangePickup; let fixture: ComponentFixture<MangePickup>;
  let cache: { bookings: ReturnType<typeof signal<PickupBooking[]>>; statusBookings: ReturnType<typeof signal<PickupBooking[]>>; loaded: ReturnType<typeof signal<boolean>>; loading: ReturnType<typeof signal<boolean>>; statusLoading: ReturnType<typeof signal<boolean>>; error: ReturnType<typeof signal<string>>; loadAll: ReturnType<typeof vi.fn>; clearStatus: ReturnType<typeof vi.fn>; searchStatus: ReturnType<typeof vi.fn> };
  beforeEach(async () => {
    cache = { bookings: signal(sampleBookings()), statusBookings: signal<PickupBooking[]>([]), loaded: signal(true), loading: signal(false), statusLoading: signal(false), error: signal(''), loadAll: vi.fn().mockResolvedValue(undefined), clearStatus: vi.fn(), searchStatus: vi.fn().mockResolvedValue(undefined) };
    await TestBed.configureTestingModule({ imports: [MangePickup], providers: [provideRouter([]), { provide: PickupBookings, useValue: cache }, { provide: Dropdowns, useValue: { loadCities: vi.fn(), loadServices: vi.fn(), cities: signal([{ cl_CodeID: 'CAI', cl_CodeName: 'Cairo', cl_AreaCode: 'EG' }]), services: signal([{ cl_CodeID: 'PRY', cl_CodeName: 'Priority' }]), citiesLoading: signal(false), citiesError: signal(null) } }] }).compileComponents();
    fixture = TestBed.createComponent(MangePickup); component = fixture.componentInstance;
    await fixture.whenStable();
    for (const dialog of fixture.nativeElement.querySelectorAll('dialog')) { dialog.close = vi.fn(); dialog.showModal = vi.fn(); }
  });
  it('exports all results, across pages, and exports only the searched booking', async () => {
    vi.mocked(writeXlsxFile).mockClear(); component.viewAll();
    expect(component.visibleRows()).toHaveLength(20);
    await component.exportPreview();
    expect(vi.mocked(writeXlsxFile).mock.calls[0][0]).toHaveLength(55);
    component.bookingSearch.set('S60050'); component.searchBooking(); await component.exportPreview();
    expect(vi.mocked(writeXlsxFile).mock.calls[1][0]).toHaveLength(2);
    component.bookingSearch.set('NOT-FOUND'); component.searchBooking(); await component.exportPreview();
    expect(writeXlsxFile).toHaveBeenCalledTimes(2);
  });
  it('uses city codes and receiver names across all dates without a status request', () => {
    component.changeOrigin('CAI'); expect(component.filters().from).toBe('');
    expect(component.filteredRows()).toHaveLength(18);
    component.viewAll(); component.setDraft('address', 'Receiver 40'); component.applyFilters();
    expect(component.filteredRows().map(row => row.number)).toEqual(['S60050']);
    component.setDraft('address', 'Sender Company'); component.applyFilters();
    expect(component.filteredRows()).toHaveLength(0); expect(cache.searchStatus).not.toHaveBeenCalled();
  });
  it('uses server status results without comparing the display label to the search status', () => {
    cache.statusBookings.set([cache.bookings()[40]]);
    component.draft.set({ ...component.initialFilters, status: 'Pending' }); component.applyFilters();
    expect(cache.searchStatus).toHaveBeenCalledWith(expect.objectContaining({ status: 'Pending', from: '', to: '' }), '');
    expect(component.filteredRows()[0].status).toBe('Booking Created');
    component.draft.set({ ...component.filters(), status: '' }); component.applyFilters();
    expect(cache.clearStatus).toHaveBeenCalled(); expect(component.filteredRows()).toHaveLength(54);
  });
  it('shows missing search results in the table without a popup', async () => {
    component.bookingSearch.set('DOES-NOT-EXIST'); component.searchBooking(); await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.empty-cell h2').textContent).toBe('No bookings found');
    expect(fixture.nativeElement.querySelector('.pickup-notice').showModal).not.toHaveBeenCalled();
  });
  it('shows all bookings by default and filters live without submitting or requesting data', async () => {
    expect(component.filteredRows()).toHaveLength(54);
    expect(component.visibleRows()).toHaveLength(20);
    expect(component.filters().from).toBe('');
    cache.loadAll.mockClear(); cache.searchStatus.mockClear();
    const input = fixture.nativeElement.querySelector('input[name="booking-search"]') as HTMLInputElement;
    input.value = '6005'; input.dispatchEvent(new Event('input')); await fixture.whenStable();
    expect(component.filteredRows()).toHaveLength(10);
    input.value = 'S60050'; input.dispatchEvent(new Event('input')); await fixture.whenStable();
    expect(component.filteredRows().map(row => row.number)).toEqual(['S60050']);
    input.value = ''; input.dispatchEvent(new Event('input')); await fixture.whenStable();
    expect(component.filteredRows()).toHaveLength(54);
    expect(component.visibleRows()).toHaveLength(20);
    expect(cache.loadAll).not.toHaveBeenCalled(); expect(cache.searchStatus).not.toHaveBeenCalled();
  });
  it('does not interrupt live typing with an empty-results popup', async () => {
    const dialog = fixture.nativeElement.querySelector('.pickup-notice') as HTMLDialogElement;
    component.updateBookingSearch('UNKNOWN'); await fixture.whenStable();
    expect(component.filteredRows()).toHaveLength(0);
    expect(dialog.showModal).not.toHaveBeenCalled();
  });
  it('filters existing status results live and restores them when the number is removed', async () => {
    cache.statusBookings.set([cache.bookings()[10], cache.bookings()[40]]);
    component.draft.set({ ...component.initialFilters, status: 'Pending' }); component.applyFilters();
    cache.searchStatus.mockClear();
    component.updateBookingSearch('S60050');
    expect(component.filteredRows()).toHaveLength(1);
    component.clearBookingSearch();
    expect(component.filteredRows()).toHaveLength(2);
    expect(component.filters().status).toBe('Pending');
    expect(cache.searchStatus).not.toHaveBeenCalled();
  });

  it('displays creation and pickup dates separately without shifting calendar days', async () => {
    cache.bookings.set([{ ...cache.bookings()[0], ShipBookingDate: 'Oct 30 2026', PickupDate: 'Nov  1 2026' }]);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.created-date').textContent.trim()).toBe('30 Oct 2026');
    expect(fixture.nativeElement.querySelector('.pickup-date').textContent.trim()).toBe('01 Nov 2026');
    expect(component.rows()[0].created).toBe('2026-10-30');
    expect(component.rows()[0].date).toBe('2026-11-01');
  });

  it('defaults the filter date range to today without restricting the initial bookings', () => {
    component.openFilters();
    expect(component.draft().from).toBe(cairoClock().date);
    expect(component.draft().to).toBe(cairoClock().date);
    expect(component.filters().from).toBe('');
    expect(component.filteredRows()).toHaveLength(54);
    component.applyFilters();
    expect(component.filters().from).toBe(cairoClock().date);
    expect(component.filteredRows()).toHaveLength(1);
  });

  it('shows a quiet empty account state without filter advice or a popup', async () => {
    cache.bookings.set([]); await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.empty-cell h2').textContent).toBe('No bookings yet');
    expect(fixture.nativeElement.querySelector('.empty-cell .text-button')).toBeNull();
    expect(fixture.nativeElement.querySelector('.pickup-notice').showModal).not.toHaveBeenCalled();
    component.draft.set({ ...component.initialFilters, from: '2026-10-30', to: '2026-10-30' });
    component.applyFilters(); await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.empty-cell h2').textContent).toBe('No bookings found');
    expect(fixture.nativeElement.querySelector('.empty-cell .text-button')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.pickup-notice').showModal).not.toHaveBeenCalled();
  });

  it('keeps an unmatched city result in the table without opening a popup', async () => {
    component.changeOrigin('UNKNOWN-CITY'); await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.empty-cell h2').textContent).toBe('No bookings found');
    expect(fixture.nativeElement.querySelector('.pickup-notice').showModal).not.toHaveBeenCalled();
  });

  it('uses the shared toast to confirm copying and dismisses it automatically', async () => {
    const original = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    vi.useFakeTimers();
    try {
      await component.copyNumber('S60090'); fixture.detectChanges();
      expect(writeText).toHaveBeenCalledWith('S60090');
      expect(fixture.nativeElement.querySelector('app-toast').textContent).toContain('S60090 copied to clipboard.');
      vi.advanceTimersByTime(3000); fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('app-toast')).toBeNull();
      writeText.mockRejectedValueOnce(new Error('Permission denied'));
      await component.copyNumber('S60090'); fixture.detectChanges();
      expect(component.copyToast()?.success).toBe(false);
      expect(fixture.nativeElement.querySelector('app-toast').textContent).toContain('Unable to copy');
      component.dismissCopyToast();
    } finally {
      vi.useRealTimers();
      if (original) Object.defineProperty(navigator, 'clipboard', original);
      else Reflect.deleteProperty(navigator, 'clipboard');
    }
  });

});
