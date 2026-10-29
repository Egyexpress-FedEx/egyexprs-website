import { Component, DestroyRef, ElementRef, computed, effect, inject, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { cairoClock, closingTime, displayTime, minutes, nextWorkingDate, timeFromMinutes } from './pickup-schedule';
import { Dropdowns } from '../../rating/service/domestic/dropdowns';
import { Pickup } from '../service/pickup';
import { AuthState } from '../../../../shared/stats/auth-state';

@Component({
  imports: [ReactiveFormsModule],
  providers: [Dropdowns],
  selector: 'app-schedule-pinkup',
  styleUrl: './schedule-pinkup.css',
  templateUrl: './schedule-pinkup.html',
})
export class SchedulePinkup {
  readonly dropdowns = inject(Dropdowns);
  private readonly accountService = inject(Pickup);
  private readonly auth = inject(AuthState);
  private readonly destroyRef = inject(DestroyRef);
  readonly addressLoading = signal(false);
  readonly addressError = signal('');
  readonly submissionError = signal('');
  readonly requiredFieldsValid = signal(false);
  readonly canSubmit = computed(() => this.requiredFieldsValid() && !this.scheduleError() && !this.addressLoading());

  validatePickup(form: HTMLFormElement): void {
    this.requiredFieldsValid.set(form.checkValidity());
    this.submissionError.set('');
  }

  submitPickup(form: HTMLFormElement): void {
    this.submissionError.set('');
    this.activateSchedule();
    if (!form.reportValidity()) {
      this.submissionError.set('Please complete all required fields with valid values.');
      return;
    }
    if (this.scheduleError()) {
      this.submissionError.set(this.scheduleError());
      this.scrollToSchedule();
      return;
    }
    this.submissionError.set('Pickup booking is currently unavailable. Your request has not been sent. Please contact customer service to arrange your pickup.');
  }
  readonly address = new FormGroup({
    company: new FormControl('', { nonNullable: true }),
    contact: new FormControl('', { nonNullable: true }),
    address: new FormControl('', { nonNullable: true }),
    area: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    telephone: new FormControl('', { nonNullable: true }),
    mobile: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
  });
  private readonly selectedCity = toSignal(this.address.controls.city.valueChanges, { initialValue: '' });
  readonly clock = signal(cairoClock());
  readonly pickupDate = signal(this.clock().date);
  readonly earliestTime = signal(this.clock().time < '09:00' ? '09:00' : this.clock().time);
  private readonly editedLatest = signal<string | null>(null);
  readonly latestTime = computed(() => this.editedLatest() ?? (this.earliestTime() && (!this.closing() || this.earliestTime() <= this.closing()) ? timeFromMinutes(minutes(this.earliestTime()) + 120) : ''));
  readonly minimumEnd = computed(() => this.earliestTime() ? timeFromMinutes(Math.min(1439, minutes(this.earliestTime()) + 60)) : '');
  readonly maximumEnd = computed(() => this.closing() ? timeFromMinutes(minutes(this.closing()) + 120) : '');
  readonly latestLimitExceeded = computed(() => !!this.maximumEnd() && !!this.latestTime() && this.latestTime() > this.maximumEnd());
  readonly latestLimitMessage = computed(() => this.closing() ? `Your city stops accepting pickup requests at ${displayTime(this.closing())}. Latest Possible Time cannot be later than ${displayTime(this.maximumEnd())}, two hours after closing. Please choose an earlier time.` : '');
  readonly dateNotice = signal('');
  private readonly cutoffTransfer = signal<{ sourceDate: string; sourceCity: string; targetDate: string } | null>(null);
  readonly closing = computed(() => this.selectedCity() ? closingTime(this.selectedCity()) : '');
  readonly minimumStart = computed(() => this.pickupDate() === this.clock().date && this.clock().time > '09:00' ? this.clock().time : '09:00');
  readonly maximumStart = computed(() => this.closing());
  readonly workdayEnded = computed(() => this.pickupDate() === this.clock().date && !!this.closing() && this.clock().time > this.closing());
  readonly hoursDescription = computed(() => this.closing() ? `Pickup requests can start from 9:00 AM to ${displayTime(this.closing())} (Egypt time). Your courier will collect within two hours of the start time.` : 'Select your collection city to see its booking hours.');
  readonly scheduleError = computed(() => {
    if (!this.pickupDate()) return 'Please select a pickup date.';
    if (this.pickupDate() < this.clock().date) return 'Please select today or a future working day.';
    if (this.workdayEnded()) return `Today's booking hours ended at ${displayTime(this.closing())}. Please move your pickup to the next working day.`;
    if (!this.earliestTime()) return 'Please select the earliest possible time.';
    if (this.closing() && this.earliestTime() > this.closing()) return `Pickup requests cannot start after ${displayTime(this.closing())} for your city. Choose an earlier time or the next working day.`;
    if (this.earliestTime() < this.minimumStart()) return `Earliest Possible Time must be ${displayTime(this.minimumStart())} or later.`;
    if (!this.latestTime()) return 'Please select the latest possible time.';
    if (this.latestLimitExceeded()) return this.latestLimitMessage();
    if (minutes(this.latestTime()) - minutes(this.earliestTime()) < 60) return 'Latest Possible Time must be at least one hour after Earliest Possible Time.';
    return '';
  });
  private readonly afterHoursDialog = viewChild<ElementRef<HTMLDialogElement>>('afterHoursDialog');
  private readonly returnTodayDialog = viewChild<ElementRef<HTMLDialogElement>>('returnTodayDialog');
  readonly returnTodayMessage = signal('');
  private readonly weekendDialog = viewChild<ElementRef<HTMLDialogElement>>('weekendDialog');
  private readonly latestLimitDialog = viewChild<ElementRef<HTMLDialogElement>>('latestLimitDialog');
  private readonly dismissedLatestLimit = signal('');
  private readonly latestLimitKey = computed(() => `${this.pickupDate()}:${this.selectedCity()}:${this.latestTime()}`);
  private readonly scheduleSection = viewChild<ElementRef<HTMLElement>>('scheduleSection');
  private readonly scheduleActivated = signal(false);
  readonly weekendMessage = signal('');

  activateSchedule(): void {
    this.scheduleActivated.set(true);
  }

  closeWeekendNotice(): void {
    if (this.weekendMessage()) this.earliestTime.set(this.minimumStart());
    this.weekendMessage.set('');
    this.weekendDialog()?.nativeElement.close?.();
    this.scrollToSchedule();
  }

  private scrollToSchedule(): void {
    const section = this.scheduleSection()?.nativeElement;
    const reducedMotion = section?.ownerDocument.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    section?.scrollIntoView?.({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
  }

  closeReturnToday(): void {
    this.returnTodayMessage.set('');
    this.returnTodayDialog()?.nativeElement.close?.();
    this.scrollToSchedule();
  }
  private readonly dismissedCutoff = signal('');
  private readonly cutoffKey = computed(() => `${this.pickupDate()}:${this.selectedCity()}:${this.closing()}`);
  readonly proposedDate = computed(() => {
    const date = new Date(`${this.pickupDate() >= this.clock().date ? this.pickupDate() : this.clock().date}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() + 1);
    return nextWorkingDate(date.toISOString().slice(0, 10));
  });
  readonly cutoffDescription = computed(() => this.closing() ? `Pickup requests cannot start after ${displayTime(this.closing())} for your city. Would you like to move your pickup to ${this.proposedDate()}, the next working day? You can then choose your time between 9:00 AM and ${displayTime(this.closing())}.` : '');

  setEarliestTime(time: string): void {
    if (this.workdayEnded()) return;
    this.dismissedCutoff.set('');
    this.earliestTime.set(time);
    if (time && !this.scheduleError()) this.dateNotice.set('');
  }

  setLatestTime(time: string): void {
    if (this.workdayEnded()) return;
    this.dismissedLatestLimit.set('');
    this.editedLatest.set(time);
    if (time && !this.scheduleError()) this.dateNotice.set('');
  }

  closeLatestLimit(): void {
    this.dismissedLatestLimit.set(this.latestLimitKey());
    this.latestLimitDialog()?.nativeElement.close?.();
  }

  declineNextDay(): void {
    this.dismissedCutoff.set(this.cutoffKey());
    this.afterHoursDialog()?.nativeElement.close?.();
  }

  requestNextWorkingDay(): void {
    this.activateSchedule();
    this.dismissedCutoff.set('');
  }

  acceptNextDay(): void {
    const transfer = { sourceDate: this.pickupDate(), sourceCity: this.selectedCity(), targetDate: this.proposedDate() };
    this.setPickupDate(transfer.targetDate);
    this.cutoffTransfer.set(transfer);
    this.earliestTime.set('09:00');
    this.dateNotice.set('Your pickup has been moved to the next working day, starting at 9:00 AM. You can change your preferred start time. Your courier will collect within two hours.');
    this.afterHoursDialog()?.nativeElement.close?.();
    this.scrollToSchedule();
  }

  setPickupDate(date: string): void {
    this.editedLatest.set(null);
    this.cutoffTransfer.set(null);
    const workingDate = nextWorkingDate(date);
    this.pickupDate.set(workingDate);
    const nextDay = workingDate !== date ? new Intl.DateTimeFormat('en-GB', {
      timeZone: 'UTC', weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
    }).format(new Date(`${workingDate}T12:00:00Z`)) : '';
    const message = nextDay ? `Friday and Saturday are non-working days. Your pickup has been moved to ${nextDay}, the next working day.` : '';
    this.dateNotice.set(message);
    this.weekendMessage.set(message);
    this.earliestTime.set(this.minimumStart());
  }

  constructor() {
    effect(() => {
      const dialog = this.latestLimitDialog()?.nativeElement;
      if (this.scheduleActivated() && this.latestLimitExceeded() && !this.workdayEnded() && this.dismissedLatestLimit() !== this.latestLimitKey()) {
        if (dialog && !dialog.open) dialog.showModal?.();
      } else if (dialog?.open) dialog.close?.();
    });
    effect(() => {
      const dialog = this.weekendDialog()?.nativeElement;
      if (this.scheduleActivated() && this.weekendMessage() && dialog && !dialog.open) dialog.showModal?.();
      else if (!this.weekendMessage() && dialog?.open) dialog.close?.();
    });
    effect(() => {
      const transfer = this.cutoffTransfer();
      const city = this.selectedCity();
      const today = this.clock().date;
      if (!transfer || !city || city === transfer.sourceCity || transfer.sourceDate !== today ||
          this.pickupDate() !== transfer.targetDate || nextWorkingDate(today) !== today ||
          this.clock().time > this.closing()) return;
      const cityName = this.dropdowns.cities().find(item => item.cl_CodeID === city)?.cl_CodeName || city;
      this.setPickupDate(today);
      this.dismissedCutoff.set('');
      const message = `Pickup is still available today in ${cityName} until ${displayTime(this.closing())}. Your pickup date has been changed back to today.`;
      this.dateNotice.set(message);
      this.returnTodayMessage.set(message);
    });
    effect(() => {
      const dialog = this.returnTodayDialog()?.nativeElement;
      if (this.returnTodayMessage() && dialog && !dialog.open) dialog.showModal?.();
    });
    effect(() => {
      const dialog = this.afterHoursDialog()?.nativeElement;
      const afterHours = this.workdayEnded() || (this.closing() && this.earliestTime() > this.closing() && this.pickupDate() >= this.clock().date);
      if (this.scheduleActivated() && afterHours && this.dismissedCutoff() !== this.cutoffKey()) {
        if (dialog && !dialog.open) dialog.showModal?.();
      } else if (dialog?.open) dialog.close?.();
    });
    this.setPickupDate(this.pickupDate());
    // Check frequently so the displayed minute also catches up after an inactive tab resumes.
    const clock = setInterval(() => this.refreshEarliestTime(), 1000);
    this.destroyRef.onDestroy(() => clearInterval(clock));
    const account = this.auth.credentials();
    if (!account) return;
    if (!this.auth.apiPassword()) {
      this.addressError.set('Please sign in again to load your saved collection address and cities.');
      return;
    }
    this.dropdowns.loadCities();
    this.addressLoading.set(true);
    this.accountService.getAccountDetils({
      AccountNo: account.AccountNo || account.CoCode,
      UserID: account.UserID,
      UserPwd: this.auth.apiPassword(),
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: response => {
        this.addressLoading.set(false);
        const customer = response.CustomerDetails;
        if (response.Code === '-1' || !customer?.cl_CustName) {
          this.addressError.set(response.Description || 'Unable to load your collection address. You can enter it below.');
          return;
        }
        // Keep any details already edited while the account request was loading.
        const defaults = {
          company: customer.cl_CustName, contact: customer.cl_CPerson,
          address: customer.cl_CustAddress, area: customer.cl_CustAddress1,
          city: customer.cl_CustCity?.trim(), telephone: customer.cl_CustPhone,
          mobile: customer.cl_CustMobile, email: customer.cl_CustEMail,
        };
        for (const key of Object.keys(defaults) as (keyof typeof defaults)[]) {
          if (!this.address.controls[key].dirty) this.address.controls[key].setValue(defaults[key] ?? '');
        }
      },
      error: () => {
        this.addressLoading.set(false);
        this.addressError.set('Unable to load your collection address. You can enter it below.');
      },
    });
  }
  private refreshEarliestTime(): void {
    const now = cairoClock();
    if (now.date === this.clock().date && now.time === this.clock().time) return;
    this.clock.set(now);
    if (this.pickupDate() === now.date && this.earliestTime() && this.earliestTime() < this.minimumStart()) {
      this.earliestTime.set(this.minimumStart());
    }
  }
}
