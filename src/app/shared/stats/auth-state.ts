import { Injectable, computed, signal } from '@angular/core';
import { UserCredentials } from '../../features/identity/interface/login';
import { CredentialVault } from './credential-vault';

export type AccountSession = Omit<UserCredentials, 'UserPWD'>;
const SESSION_KEY = 'egxpress.account-session';
const API_SESSION_KEY = 'egxpress.api-session';
const SESSION_FIELDS = ['CoCode', 'DivCode', 'ShipmentType', 'UserID', 'UserName', 'UserTag', 'UserType'] as const;

@Injectable({ providedIn: 'root' })
export class AuthState {
  private readonly apiPasswordState = signal('');
  readonly apiPassword = this.apiPasswordState.asReadonly();
  private readonly credentialsState = signal<AccountSession | null>(null);
  readonly credentials = this.credentialsState.asReadonly();
  readonly isLoggedIn = computed(() => this.credentials() !== null && !!this.apiPassword());
  readonly shipmentType = computed(() => this.credentials()?.ShipmentType?.trim().toUpperCase() ?? '');
  readonly isDomesticAccount = computed(() => this.shipmentType() === 'D');
  readonly isInternationalAccount = computed(() => this.shipmentType() === 'I');
  readonly userName = computed(() => this.credentials()?.UserName ?? '');
  readonly persistenceNotice = signal('');
  readonly ready: Promise<void>;
  private revision = 0;

  constructor(private readonly vault: CredentialVault = new CredentialVault()) {
    this.ready = this.restoreSession();
  }

  async setCredentials(credentials: UserCredentials, remember = false, loginPassword = ''): Promise<void> {
    const revision = ++this.revision;
    const password = credentials.UserPWD || loginPassword;
    const session = this.readSession(credentials);
    this.removeStoredSession();
    this.persistenceNotice.set('');
    this.apiPasswordState.set(session && password ? password : '');
    this.credentialsState.set(session && password ? session : null);
    if (!session || !password) return;
    try {
      const encrypted = await this.vault.encrypt(password, session);
      if (revision !== this.revision) return;
      const storage = remember ? globalThis.localStorage : globalThis.sessionStorage;
      storage.setItem(API_SESSION_KEY, JSON.stringify(encrypted));
      storage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      if (revision !== this.revision) return;
      this.removeStoredSession();
      this.persistenceNotice.set('You are signed in for this tab only. Your browser could not securely save your session.');
    }
  }

  clearCredentials(): void {
    this.revision++;
    this.apiPasswordState.set('');
    this.credentialsState.set(null);
    this.persistenceNotice.set('');
    this.removeStoredSession();
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

  private async restoreSession(): Promise<void> {
    const revision = this.revision;
    for (const name of ['sessionStorage', 'localStorage'] as const) {
      try {
        const storage = globalThis[name];
        const session = this.readSession(JSON.parse(storage.getItem(SESSION_KEY) || 'null'));
        const encrypted: unknown = JSON.parse(storage.getItem(API_SESSION_KEY) || 'null');
        if (!session || !encrypted) { storage.removeItem(SESSION_KEY); storage.removeItem(API_SESSION_KEY); continue; }
        // Old plaintext sessions are discarded; they are never copied to the new vault.
        if (typeof encrypted !== 'object' || 'UserPwd' in encrypted) throw new Error('Legacy session.');
        const password = await this.vault.decrypt(encrypted, session);
        if (revision !== this.revision) return;
        if (!password) throw new Error('Empty session.');
        this.apiPasswordState.set(password);
        this.credentialsState.set(session);
        return;
      } catch {
        if (revision !== this.revision) return;
        try { globalThis[name].removeItem(SESSION_KEY); globalThis[name].removeItem(API_SESSION_KEY); } catch { /* Browser storage may be unavailable. */ }
      }
    }
  }

  private removeStoredSession(): void {
    for (const name of ['sessionStorage', 'localStorage'] as const) {
      try { globalThis[name].removeItem(SESSION_KEY); globalThis[name].removeItem(API_SESSION_KEY); } catch { /* Keep in-memory sign-in available. */ }
    }
  }
}
