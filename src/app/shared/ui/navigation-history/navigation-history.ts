import { Component, Injectable, computed, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthState } from '../../stats/auth-state';

interface Visit { id: number; url: string; label: string; }

@Injectable({ providedIn: 'root' })
export class NavigationHistory {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private entries: Visit[] = [];
  private index = -1;
  private restoredId: number | undefined;
  readonly current = signal<Visit | null>(null);
  readonly previous = signal<Visit | null>(null);
  readonly recent = signal<Visit[]>([]);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof NavigationStart) this.restoredId = event.restoredState?.navigationId;
      if (!(event instanceof NavigationEnd)) return;
      const visit = { id: event.id, url: event.urlAfterRedirects, label: this.label(event.urlAfterRedirects) };
      const restoredIndex = this.entries.findIndex(item => item.id === this.restoredId);
      if (this.restoredId !== undefined) {
        // Unknown browser entries (for example after a reload) must not lead off-site.
        if (restoredIndex < 0) { this.entries = []; this.index = 0; }
        else this.index = restoredIndex;
        this.entries[this.index] = visit;
      } else if (this.router.currentNavigation()?.extras.replaceUrl && this.index >= 0) {
        this.entries[this.index] = visit;
      } else {
        this.entries = this.entries.slice(0, this.index + 1);
        this.entries.push(visit);
        this.index = this.entries.length - 1;
      }
      const old = this.current();
      if (old && old.url !== visit.url) {
        this.recent.update(items => [old, ...items.filter(item => item.url !== old.url)].slice(0, 6));
      }
      this.recent.update(items => items.filter(item => item.url !== visit.url));
      this.current.set(visit);
      this.previous.set(this.entries[this.index - 1] ?? null);
    });
  }

  back(): void {
    if (this.previous()) this.location.back();
    else void this.router.navigateByUrl('/home');
  }

  private label(url: string): string {
    const path = url.split(/[?#]/)[0];
    const labels: Record<string, string> = {
      '/home': 'Home', '/home/rate/domestic': 'Domestic rates',
      '/home/rate/international': 'International rates', '/rate': 'Shipping rates',
      '/shipping/pickups/schedule': 'Schedule a pickup', '/shipping/pickups/manage': 'Manage pickups',
      '/shipping/create-shipments': 'Create shipments', '/shipping/batch-shipments': 'Batch shipments',
      '/shipping/shipments': 'Shipments', '/shipping/address-book': 'Address book',
      '/login': 'Sign in', '/register': 'Register', '/open-account': 'Open an account',
    };
    return labels[path] ?? 'Page';
  }
}

@Component({
  selector: 'app-navigation-history',
  imports: [RouterLink],
  templateUrl: './navigation-history.html',
  styleUrl: './navigation-history.css',
  host: { '[style.display]': 'visible() ? null : "none"' },
})
export class NavigationHistoryBar {
  readonly history = inject(NavigationHistory);
  private readonly auth = inject(AuthState);
  readonly visible = computed(() => {
    const path = this.history.current()?.url.split(/[?#]/)[0];
    return this.auth.isLoggedIn() && !!path && path !== '/home' && !path.startsWith('/home/');
  });
}
