import { Injectable } from '@angular/core';

export interface EncryptedApiSession {
  version: 1;
  UserID: string;
  CoCode: string;
  iv: string;
  ciphertext: string;
}
interface AccountIdentity { UserID: string; CoCode: string; }

// Encryption protects stored values from casual inspection. Same-origin script
// can still use this key; this is not a substitute for a server-side session.
@Injectable({ providedIn: 'root' })
export class CredentialVault {
  private keyRequest?: Promise<CryptoKey>;
  private bytes(value: string): Uint8Array<ArrayBuffer> {
    return Uint8Array.from(atob(value), character => character.charCodeAt(0));
  }
  private base64(value: ArrayBuffer | Uint8Array): string {
    return btoa(String.fromCharCode(...new Uint8Array(value)));
  }
  private identity(account: AccountIdentity): Uint8Array<ArrayBuffer> {
    return new TextEncoder().encode(JSON.stringify([account.UserID, account.CoCode]));
  }
  async encrypt(password: string, account: AccountIdentity): Promise<EncryptedApiSession> {
    const key = await this.key();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: this.identity(account) }, key, new TextEncoder().encode(password));
    return { version: 1, UserID: account.UserID, CoCode: account.CoCode, iv: this.base64(iv), ciphertext: this.base64(ciphertext) };
  }
  async decrypt(value: unknown, account: AccountIdentity): Promise<string> {
    const envelope = value as Partial<EncryptedApiSession> | null;
    if (envelope?.version !== 1 || envelope.UserID !== account.UserID || envelope.CoCode !== account.CoCode ||
        typeof envelope.iv !== 'string' || typeof envelope.ciphertext !== 'string') throw new Error('Invalid saved session.');
    const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: this.bytes(envelope.iv), additionalData: this.identity(account) }, await this.key(), this.bytes(envelope.ciphertext));
    return new TextDecoder().decode(plaintext);
  }
  private key(): Promise<CryptoKey> {
    if (!this.keyRequest) {
      this.keyRequest = this.readKey().catch(error => { this.keyRequest = undefined; throw error; });
    }
    return this.keyRequest;
  }
  private async readKey(): Promise<CryptoKey> {
    if (!globalThis.indexedDB || !globalThis.crypto?.subtle) throw new Error('Secure browser storage is unavailable.');
    const database = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('egxpress-credential-vault', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('keys');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error('Secure storage is blocked.'));
    });
    try {
      const existing = await new Promise<CryptoKey | undefined>((resolve, reject) => {
        const transaction = database.transaction('keys', 'readonly');
        const request = transaction.objectStore('keys').get('api-session');
        transaction.oncomplete = () => resolve(request.result);
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error);
      });
      if (existing) return existing;
      const candidate = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
      // Serialize first-time creation across tabs so one cannot replace another's key.
      return await new Promise<CryptoKey>((resolve, reject) => {
        const transaction = database.transaction('keys', 'readwrite');
        const store = transaction.objectStore('keys');
        const request = store.get('api-session');
        let key: CryptoKey;
        request.onsuccess = () => {
          key = request.result || candidate;
          if (!request.result) store.put(candidate, 'api-session');
        };
        transaction.oncomplete = () => resolve(key);
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error);
      });
    } finally { database.close(); }
  }
}
