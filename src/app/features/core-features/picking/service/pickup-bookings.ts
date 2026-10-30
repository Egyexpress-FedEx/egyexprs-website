import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AccountSession, AuthState } from '../../../../shared/stats/auth-state';
import { Pickup } from './pickup';
import { PickupBooking, PickupFilters, PickupListRequest, parsePickupResponse, pickupFilterCondition } from '../interface/pickup-list';

@Injectable({ providedIn: 'root' })
export class PickupBookings {
  private readonly auth = inject(AuthState);
  private readonly api = inject(Pickup);
  private owner: AccountSession | null = null;
  private generation = 0;
  private statusGeneration = 0;
  private allRequest?: Promise<void>;
  private readonly allState = signal<{ owner: AccountSession | null; rows: PickupBooking[]; loaded: boolean }>({ owner: null, rows: [], loaded: false });
  private readonly statusState = signal<{ owner: AccountSession | null; rows: PickupBooking[] }>({ owner: null, rows: [] });
  private readonly allBusy = signal(false);
  private readonly statusBusy = signal(false);
  private readonly failure = signal('');
  private customerCode = '';
  readonly bookings = computed(() => this.allState().owner === this.auth.credentials() ? this.allState().rows : []);
  readonly statusBookings = computed(() => this.statusState().owner === this.auth.credentials() ? this.statusState().rows : []);
  readonly loaded = computed(() => this.allState().owner === this.auth.credentials() && this.allState().loaded);
  readonly loading = computed(() => this.owner === this.auth.credentials() && this.allBusy());
  readonly statusLoading = computed(() => this.owner === this.auth.credentials() && this.statusBusy());
  readonly error = computed(() => this.owner === this.auth.credentials() ? this.failure() : '');

  constructor() {
    effect(() => {
      const account = this.auth.credentials();
      untracked(() => { if (account !== this.owner) this.reset(account); });
    });
  }
  private reset(account: AccountSession | null): void {
    this.owner = account; this.generation++; this.statusGeneration++;
    this.customerCode = ''; this.allRequest = undefined;
    this.allState.set({ owner: account, rows: [], loaded: false });
    this.statusState.set({ owner: account, rows: [] });
    this.allBusy.set(false); this.statusBusy.set(false); this.failure.set('');
  }
  private ensureOwner(): AccountSession | null {
    const account = this.auth.credentials();
    if (account !== this.owner) this.reset(account);
    return account;
  }
  private isCurrent(account: AccountSession, generation: number): boolean {
    return this.auth.credentials() === account && this.generation === generation;
  }
  private request(filters?: PickupFilters, origin = ''): PickupListRequest {
    return {
      AccessCode: this.owner?.UserID || '',
      ActiveDataBase: this.owner?.ActiveDataBase || 'integraontrack',
      FilterCondition: pickupFilterCondition(this.customerCode, filters, origin),
    };
  }
  loadAll(force = false): Promise<void> {
    const account = this.ensureOwner();
    if (!account) { this.failure.set('Please sign in to view your pickups.'); return Promise.resolve(); }
    if (this.allRequest) return this.allRequest;
    if (this.loaded() && !force) return Promise.resolve();
    const generation = this.generation;
    this.allBusy.set(true); this.failure.set('');
    this.allRequest = (async () => {
      try {
        if (!this.customerCode) {
          if (!this.auth.apiPassword()) throw new Error('Please sign in again to load your account.');
          const details = await firstValueFrom(this.api.getAccountDetils({
            AccountNo: account.AccountNo || account.CoCode, UserID: account.UserID, UserPwd: this.auth.apiPassword(),
          }));
          if (!this.isCurrent(account, generation)) return;
          if (details.Code !== '101' || !details.CustomerDetails) throw new Error(details.Description || 'Unable to load your account.');
          this.customerCode = details.CustomerDetails.cl_CustCode || account.AccountNo || account.CoCode;
        }
        const response = await firstValueFrom(this.api.getPickupList(this.request()));
        if (!this.isCurrent(account, generation)) return;
        const rows = parsePickupResponse(response, this.customerCode);
        this.allState.set({ owner: account, rows, loaded: true });
      } catch (error) {
        if (this.isCurrent(account, generation)) this.failure.set(this.errorMessage(error));
      } finally {
        if (this.isCurrent(account, generation)) { this.allBusy.set(false); this.allRequest = undefined; }
      }
    })();
    return this.allRequest;
  }
  clearStatus(): void {
    this.statusGeneration++; this.statusBusy.set(false);
    this.statusState.set({ owner: this.owner, rows: [] }); this.failure.set('');
  }
  async searchStatus(filters: PickupFilters, origin: string): Promise<void> {
    this.ensureOwner();
    this.clearStatus();
    const sequence = this.statusGeneration;
    this.statusBusy.set(true);
    await this.loadAll();
    if (sequence !== this.statusGeneration) return;
    const account = this.ensureOwner();
    if (!account || !this.loaded()) { this.statusBusy.set(false); return; }
    const generation = this.generation;
    try {
      const response = await firstValueFrom(this.api.getPickupList(this.request(filters, origin)));
      if (!this.isCurrent(account, generation) || sequence !== this.statusGeneration) return;
      this.statusState.set({ owner: account, rows: parsePickupResponse(response, this.customerCode) });
    } catch (error) {
      if (this.isCurrent(account, generation) && sequence === this.statusGeneration) this.failure.set(this.errorMessage(error));
    } finally {
      if (this.isCurrent(account, generation) && sequence === this.statusGeneration) this.statusBusy.set(false);
    }
  }
  invalidate(): void {
    const account = this.ensureOwner();
    this.reset(account);
  }
  private errorMessage(error: unknown): string {
    const failure = error as { error?: { Description?: string }; message?: string };
    return failure?.error?.Description || failure?.message || 'Unable to load pickups. Please try again.';
  }
}
