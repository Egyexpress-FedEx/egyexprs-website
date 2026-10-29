import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationHistoryBar } from '../../../../shared/ui/navigation-history/navigation-history';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NavigationHistoryBar],
  selector: 'app-mage-bar',
  styleUrl: './mage-bar.css',
  templateUrl: './mage-bar.html',
})
export class MageBar {
  readonly mobileOpen = signal(false);
  private readonly mobileMenuButton = viewChild<ElementRef<HTMLButtonElement>>('mobileMenuButton');

  toggleMobileMenu(): void {
    this.collapsed.set(false);
    this.mobileOpen.update(open => !open);
  }

  closeMobileMenu(): void {
    if (!this.mobileOpen()) return;
    this.mobileOpen.set(false);
    this.mobileMenuButton()?.nativeElement.focus();
  }

  readonly collapsed = signal(false);
  readonly pickupsOpen = signal(true);
  readonly links = [
    { label: 'Create shipments', path: 'create-shipments', icon: 'M12 3 3 8l9 5 9-5-9-5ZM3 8v9l9 5 9-5V8M12 13v9M7 5.8l9 5' },
    { label: 'Batch shipments', path: 'batch-shipments', icon: 'M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6' },
    { label: 'Shipments', path: 'shipments', icon: 'M3 4h13v8M3 4v15h8M3 9h13M16 14a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm3 7 3 2' },
  ];
}

@Component({
  selector: 'app-shipping-placeholder',
  template: `<section style="padding:48px 24px;background:white;border:1px solid #e8ecef;border-radius:16px"><p style="color:#c65a0a;font-size:11px;letter-spacing:2px">SHIPPING TOOLS</p><h1 style="font-size:28px">{{ title }}</h1><p style="color:#75808a">This page is being prepared.</p></section>`,
})
export class ShippingPlaceholder {
  readonly title = inject(ActivatedRoute).snapshot.data['title'] as string;
}
