import { Service, computed, signal } from '@angular/core';
import { UserCredentials } from '../../features/identity/interface/login';

@Service()
export class AuthState {
  private readonly credentialsState = signal<UserCredentials | null>(null);

  readonly credentials = this.credentialsState.asReadonly();
  readonly isLoggedIn = computed(() => this.credentials() !== null);
  readonly userName = computed(() => this.credentials()?.UserName ?? '');

  setCredentials(credentials: UserCredentials): void {
    this.credentialsState.set(credentials);
  }

  clearCredentials(): void {
    this.credentialsState.set(null);
  }
}
