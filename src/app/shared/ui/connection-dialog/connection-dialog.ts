import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { CONNECTION_ERROR_MESSAGE, ConnectionState } from '../../stats/connection-state';

@Component({
  selector: 'app-connection-dialog',
  template: `
    <dialog #dialog class="connection-dialog" aria-labelledby="connection-title" aria-describedby="connection-message" (cancel)="connection.dismiss()" (close)="connection.dismiss()">
      <span class="connection-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 18 18M2 8.5a16 16 0 0 1 3-2M9 5a16 16 0 0 1 13 3.5M5 12a11 11 0 0 1 4-2M13 10a11 11 0 0 1 6 2M8.5 15.5a5 5 0 0 1 7 0M12 19h.01"/></svg></span>
      <h2 id="connection-title">Check your connection</h2>
      <p id="connection-message">{{ message }}</p>
      <button type="button" (click)="connection.dismiss()">OK, got it</button>
    </dialog>
  `,
  styleUrl: './connection-dialog.css',
})
export class ConnectionDialog {
  readonly connection = inject(ConnectionState);
  readonly message = CONNECTION_ERROR_MESSAGE;
  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  constructor() {
    effect(() => {
      const dialog = this.dialog()?.nativeElement;
      if (!dialog) return;
      if (this.connection.visible()) { if (!dialog.open) dialog.showModal?.(); }
      else if (dialog.open) dialog.close?.();
    });
  }
}
