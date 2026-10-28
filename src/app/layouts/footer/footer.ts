import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthState } from '../../shared/stats/auth-state';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly auth = inject(AuthState);
  readonly language = signal<'en' | 'ar'>('en');
  closeLanguageOnBlur(event: FocusEvent, menu: HTMLDetailsElement) {
    if (!(event.relatedTarget instanceof Node) || !menu.contains(event.relatedTarget)) menu.open = false;
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  readonly year = new Date().getFullYear();
  readonly socialLinks = [
    { name: 'Facebook', fragment: 'facebook', path: 'M14 21v-8h3l.5-4H14V7c0-1 .3-2 2-2h2V1.5A24 24 0 0 0 15 1c-3 0-5 2-5 5v3H7v4h3v8z' },
    { name: 'Instagram', fragment: 'instagram', path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm6-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z' },
    { name: 'LinkedIn', fragment: 'linkedin', path: 'M3 3h4v4H3zm0 6h4v12H3zm6 0h4v1.6c.7-1.2 2-2 3.7-2 4 0 4.3 2.6 4.3 6V21h-4v-5.7c0-1.7 0-3.4-2-3.4s-2 1.8-2 3.3V21H9z' },
    { name: 'YouTube', fragment: 'youtube', path: 'M22 7s-.2-1.6-.9-2.3C20.2 3.8 19.2 3.8 18.7 3.7 15.5 3.5 12 3.5 12 3.5s-3.5 0-6.7.2c-.5.1-1.5.1-2.4 1C2.2 5.4 2 7 2 7s-.3 1.9-.3 3.8v2.4C1.7 15.1 2 17 2 17s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 6.5.2 6.5.2s3.5 0 6.7-.3c.5 0 1.5 0 2.4-.9.7-.7.9-2.3.9-2.3s.3-1.9.3-3.8v-2.4C22.3 8.9 22 7 22 7Zm-12 9V8l7 4z' },
  ];
}
