import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthState } from '../../../../shared/stats/auth-state';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  readonly auth = inject(AuthState);
  readonly selectedAction = signal('track');
  readonly multiple = signal(false);
  readonly fileName = signal('No file chosen');
  setMultiple(value: boolean) {
    this.multiple.set(value);
    this.fileName.set('No file chosen');
  }
  selectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fileName.set(input.files?.[0]?.name ?? 'No file chosen');
  }
}
