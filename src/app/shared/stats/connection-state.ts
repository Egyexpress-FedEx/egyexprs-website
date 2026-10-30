import { Injectable, signal } from '@angular/core';

export const CONNECTION_ERROR_MESSAGE = 'Please check your internet connection and try again.';

@Injectable({ providedIn: 'root' })
export class ConnectionState {
  readonly visible = signal(false);
  show(): void { this.visible.set(true); }
  dismiss(): void { this.visible.set(false); }
}
