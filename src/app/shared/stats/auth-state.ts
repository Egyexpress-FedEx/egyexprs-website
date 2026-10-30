import { Service, computed, signal } from '@angular/core';
import { UserCredentials } from '../../features/identity/interface/login';

export type AccountSession = Omit<UserCredentials, 'UserPWD'>;
const SESSION_KEY = 'egxpress.account-session';
const API_SESSION_KEY = 'egxpress.api-session';
const SESSION_FIELDS = ['CoCode', 'DivCode', 'ShipmentType', 'UserID', 'UserName', 'UserTag', 'UserType'] as const;

@Service()
export class AuthState {
  private readonly apiPasswordState = signal(this.restoreApiPassword());
  readonly apiPassword = this.apiPasswordState.asReadonly();
  private readonly credentialsState = signal<AccountSession | null>(this.restoreSession());

  readonly credentials = this.credentialsState.asReadonly();
  readonly isLoggedIn = computed(() => this.credentials() !== null);
  readonly shipmentType = computed(() => this.credentials()?.ShipmentType?.trim().toUpperCase() ?? '');
  readonly isDomesticAccount = computed(() => this.shipmentType() === 'D');
  readonly isInternationalAccount = computed(() => this.shipmentType() === 'I');
  readonly userName = computed(() => this.credentials()?.UserName ?? '');

  setCredentials(credentials: UserCredentials, remember = false, loginPassword = ''): void {
    this.apiPasswordState.set(credentials.UserPWD || loginPassword);
    const session = this.readSession(credentials);
    this.removeStoredSession();
    this.credentialsState.set(session);
    if (session) {
      try {
        const storage = remember ? globalThis.localStorage : globalThis.sessionStorage;
        storage.setItem(SESSION_KEY, JSON.stringify(session));
        // The API requires a password per request; retain it only in this tab.
        globalThis.sessionStorage.setItem(API_SESSION_KEY, JSON.stringify({
          UserID: session.UserID, CoCode: session.CoCode, UserPwd: this.apiPassword(),
        }));
      } catch { /* Login still works when browser storage is unavailable. */ }
    }
  }

  clearCredentials(): void {
    this.apiPasswordState.set('');
    this.removeStoredSession();
    this.credentialsState.set(null);
  }

  private readSession(value: unknown): AccountSession | null {
    if (!value || typeof value !== 'object') return null;
    const data = value as Record<string, unknown>;
    if (!SESSION_FIELDS.every(field => typeof data[field] === 'string') || !String(data['UserID']).trim()) return null;
    const session = Object.fromEntries(SESSION_FIELDS.map(field => [field, data[field]])) as AccountSession;
    if (typeof data['AccountNo'] === 'string') session.AccountNo = data['AccountNo'];
    if (typeof data['ActiveDataBase'] === 'string') session.ActiveDataBase = data['ActiveDataBase'];
    return session;
  }

  private restoreSession(): AccountSession | null {
    for (const storageName of ['sessionStorage', 'localStorage'] as const) {
      try {
        const storage = globalThis[storageName];
        const stored = storage.getItem(SESSION_KEY);
        if (!stored) continue;
        const session = this.readSession(JSON.parse(stored));
        if (session) return session;
        storage.removeItem(SESSION_KEY);
      } catch {
        try { globalThis[storageName].removeItem(SESSION_KEY); globalThis[storageName].removeItem(API_SESSION_KEY); } catch { /* Storage may be blocked. */ }
      }
    }
    return null;
  }

  private restoreApiPassword(): string {
    try {
      const session = this.restoreSession();
      const stored = JSON.parse(globalThis.sessionStorage.getItem(API_SESSION_KEY) || 'null');
      if (session && stored?.UserID === session.UserID && stored?.CoCode === session.CoCode && typeof stored?.UserPwd === 'string') {
        return stored.UserPwd;
      }
      globalThis.sessionStorage.removeItem(API_SESSION_KEY);
    } catch { /* Storage may be blocked or contain an invalid session. */ }
    return '';
  }

  private removeStoredSession(): void {
    for (const storageName of ['sessionStorage', 'localStorage'] as const) {
      try { globalThis[storageName].removeItem(SESSION_KEY); globalThis[storageName].removeItem(API_SESSION_KEY); } catch { /* Storage may be blocked. */ }
    }
  }
}
