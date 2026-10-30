import { afterEach, describe, expect, it } from 'vitest';
import { AuthState } from './auth-state';

const credentials = { CoCode: 'D77777', DivCode: '', ShipmentType: 'D', UserID: 'test-user', UserName: 'Test', UserPWD: '', UserTag: '', UserType: '' };

afterEach(() => new AuthState().clearCredentials());

describe('AuthState session restoration', () => {
  it('restores the account and API credentials after a page reload', () => {
    const auth = new AuthState();
    auth.setCredentials(credentials, false, 'test-password');
    const restored = new AuthState();
    expect(restored.credentials()?.CoCode).toBe('D77777');
    expect(restored.apiPassword()).toBe('test-password');
    expect(restored.isLoggedIn()).toBe(true);
    expect(localStorage.getItem('egxpress.api-session')).toBeNull();
  });

  it('removes all authentication data on logout', () => {
    const auth = new AuthState();
    auth.setCredentials(credentials, true, 'test-password');
    auth.clearCredentials();
    const restored = new AuthState();
    expect(restored.credentials()).toBeNull();
    expect(restored.apiPassword()).toBe('');
    expect(sessionStorage.getItem('egxpress.api-session')).toBeNull();
  });

  it('does not restore a password belonging to a different account', () => {
    new AuthState().setCredentials(credentials, false, 'test-password');
    sessionStorage.setItem('egxpress.api-session', JSON.stringify({ UserID: 'someone-else', CoCode: 'OTHER', UserPwd: 'other-password' }));
    expect(new AuthState().apiPassword()).toBe('');
  });
});
