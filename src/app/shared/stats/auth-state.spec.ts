import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { webcrypto } from 'node:crypto';
import { AuthState } from './auth-state';
import { CredentialVault, EncryptedApiSession } from './credential-vault';

const credentials = { CoCode: 'D77777', DivCode: '', ShipmentType: 'D', UserID: 'test-user', UserName: 'Test', UserPWD: '', UserTag: '', UserType: '' };

beforeEach(async () => {
  sessionStorage.clear(); localStorage.clear();
  vi.stubGlobal('crypto', webcrypto);
  const key = await webcrypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  vi.spyOn(CredentialVault.prototype as unknown as { readKey(): Promise<CryptoKey> }, 'readKey').mockResolvedValue(key as CryptoKey);
});
afterEach(() => { sessionStorage.clear(); localStorage.clear(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('Encrypted account sessions', () => {
  it('restores a tab session without storing a plaintext password', async () => {
    const auth = new AuthState(); await auth.ready;
    await auth.setCredentials(credentials, false, 'test-password');
    const stored = sessionStorage.getItem('egxpress.api-session')!;
    expect(stored).not.toContain('test-password'); expect(stored).not.toContain('UserPwd');
    expect(JSON.parse(stored).version).toBe(1);
    const restored = new AuthState(); await restored.ready;
    expect(restored.credentials()?.CoCode).toBe('D77777');
    expect(restored.apiPassword()).toBe('test-password'); expect(restored.isLoggedIn()).toBe(true);
    expect(localStorage.getItem('egxpress.api-session')).toBeNull();
  });
  it('restores a remembered account and its encrypted credentials in a new tab', async () => {
    const auth = new AuthState(); await auth.ready;
    await auth.setCredentials(credentials, true, 'test-password');
    sessionStorage.clear();
    const restored = new AuthState(); await restored.ready;
    expect(restored.isLoggedIn()).toBe(true); expect(restored.apiPassword()).toBe('test-password');
    expect(localStorage.getItem('egxpress.api-session')).not.toContain('test-password');
  });
  it('treats metadata without usable credentials as signed out', async () => {
    localStorage.setItem('egxpress.account-session', JSON.stringify(credentials));
    const restored = new AuthState(); await restored.ready;
    expect(restored.credentials()).toBeNull(); expect(restored.isLoggedIn()).toBe(false);
    expect(localStorage.getItem('egxpress.account-session')).toBeNull();
  });
  it('removes legacy plaintext credentials rather than restoring them', async () => {
    sessionStorage.setItem('egxpress.account-session', JSON.stringify(credentials));
    sessionStorage.setItem('egxpress.api-session', JSON.stringify({ UserID: credentials.UserID, CoCode: credentials.CoCode, UserPwd: 'old-password' }));
    const restored = new AuthState(); await restored.ready;
    expect(restored.isLoggedIn()).toBe(false); expect(sessionStorage.getItem('egxpress.api-session')).toBeNull();
  });
  it('rejects tampered ciphertext and credentials belonging to another account', async () => {
    const auth = new AuthState(); await auth.ready; await auth.setCredentials(credentials, true, 'test-password');
    const envelope = JSON.parse(localStorage.getItem('egxpress.api-session')!);
    envelope.ciphertext = btoa('tampered'); localStorage.setItem('egxpress.api-session', JSON.stringify(envelope));
    const restored = new AuthState(); await restored.ready;
    expect(restored.isLoggedIn()).toBe(false);
    await auth.setCredentials(credentials, true, 'test-password');
    localStorage.setItem('egxpress.account-session', JSON.stringify({ ...credentials, CoCode: 'OTHER' }));
    const wrongAccount = new AuthState(); await wrongAccount.ready; expect(wrongAccount.isLoggedIn()).toBe(false);
  });
  it('clears remembered and tab sessions on logout', async () => {
    const auth = new AuthState(); await auth.ready; await auth.setCredentials(credentials, true, 'test-password');
    auth.clearCredentials(); const restored = new AuthState(); await restored.ready;
    expect(restored.isLoggedIn()).toBe(false); expect(restored.apiPassword()).toBe('');
    expect(localStorage.getItem('egxpress.api-session')).toBeNull(); expect(sessionStorage.getItem('egxpress.api-session')).toBeNull();
  });
  it('does not recreate saved credentials when logout occurs during encryption', async () => {
    let finish!: (value: EncryptedApiSession) => void;
    vi.spyOn(CredentialVault.prototype, 'encrypt').mockReturnValue(new Promise(resolve => { finish = resolve; }));
    const auth = new AuthState(); await auth.ready;
    const pending = auth.setCredentials(credentials, true, 'test-password'); auth.clearCredentials();
    finish({ version: 1, UserID: credentials.UserID, CoCode: credentials.CoCode, iv: '', ciphertext: '' }); await pending;
    expect(auth.isLoggedIn()).toBe(false); expect(localStorage.getItem('egxpress.api-session')).toBeNull();
  });
  it('uses a fresh nonce for each encryption and decrypts with a non-exportable key', async () => {
    const vault = new CredentialVault(); const first = await vault.encrypt('secret', credentials); const second = await vault.encrypt('secret', credentials);
    expect(first.iv).not.toBe(second.iv); expect(first.ciphertext).not.toBe(second.ciphertext);
    expect(await vault.decrypt(first, credentials)).toBe('secret');
    await expect(vault.decrypt(first, { ...credentials, UserID: 'someone-else' })).rejects.toThrow();
  });
  it('does not restore a session after logout while decryption is pending', async () => {
    const auth = new AuthState(); await auth.ready; await auth.setCredentials(credentials, true, 'test-password');
    let finish!: (password: string) => void;
    vi.spyOn(CredentialVault.prototype, 'decrypt').mockReturnValue(new Promise(resolve => { finish = resolve; }));
    const restored = new AuthState(); restored.clearCredentials(); finish('test-password'); await restored.ready;
    expect(restored.isLoggedIn()).toBe(false); expect(restored.apiPassword()).toBe('');
  });
  it('keeps a memory-only login and explains when encrypted storage is blocked', async () => {
    const auth = new AuthState(); await auth.ready;
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked'); });
    await auth.setCredentials(credentials, true, 'test-password');
    expect(auth.isLoggedIn()).toBe(true); expect(auth.persistenceNotice()).toContain('for this tab only');
    expect(localStorage.getItem('egxpress.api-session')).toBeNull();
  });

});
