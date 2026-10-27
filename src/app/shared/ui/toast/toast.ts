import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast" [class.success]="success()" [attr.role]="success() ? 'status' : 'alert'" aria-atomic="true">
      <span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/>@if (success()) { <path d="m8 12 3 3 5-6"/> } @else { <path d="M12 7v6m0 3v1"/> }</svg></span>
      <div class="content"><strong>{{ heading() }}</strong><p>{{ message() }}</p></div>
      <button type="button" aria-label="Dismiss notification" (click)="dismissed.emit()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
    </div>
  `,
  styleUrl: './toast.css',
})
export class Toast {
  readonly heading = input.required<string>();
  readonly message = input.required<string>();
  readonly success = input(false);
  readonly dismissed = output<void>();
}
