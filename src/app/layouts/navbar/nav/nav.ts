import { Component, ElementRef, HostListener, ViewChild, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  readonly isLoggedIn = input(false);
  readonly logoutRequested = output<void>();
  readonly activeMenu = signal<string | null>(null);
  readonly mobileOpen = signal(false);
  readonly searchOpen = signal(false);
  readonly scrolled = signal(false);
  readonly language = signal<'AR' | 'EN'>('EN');
  @ViewChild('searchInput')
  set searchInput(field: ElementRef<HTMLInputElement> | undefined) {
    field?.nativeElement.focus();
  }
  openSearch() {
    this.close();
    this.searchOpen.set(true);
  }
  closeSearch() {
    this.searchOpen.set(false);
    setTimeout(() => this.element.nativeElement.querySelector<HTMLButtonElement>('#search-toggle')?.focus());
  }
  readonly menus = [
    { id: 'shipping', label: 'Shipping', heading: 'Shipping', image: 'shippments.png', links: ['Ship All Features', 'Packaging & Shipping Supplies'], action: 'GET RATES AND TRANSIT TIMES' },
    { id: 'tracking', label: 'Tracking', heading: 'Track My Shipment', image: 'tracking.png', links: ['Advanced Shipment Tracking', 'Track by Mobile'], action: 'ALL TRACKING SERVICES' },
    { id: 'support', label: 'Support', heading: 'Support', image: 'Support.jpg', links: ['File a Complaint', 'Locations', 'FAQs', 'Contact Us'], action: 'CUSTOMER SUPPORT' },
    { id: 'news', label: 'NEWS', heading: 'News & Insights', image: 'news.jpg', links: ['Blogs', 'News', 'Articles'], action: null },
  ];
  constructor(private readonly element: ElementRef<HTMLElement>) {
    this.onScroll();
  }
  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set((this.element.nativeElement.ownerDocument.defaultView?.scrollY ?? 0) > 16);
  }
  toggleMenu(id: string) {
    this.activeMenu.update(current => current === id ? null : id);
  }
  hoverMenu(event: PointerEvent, id: string) {
    if (event.pointerType === 'mouse') this.activeMenu.set(id);
  }
  close() {
    this.activeMenu.set(null);
    this.mobileOpen.set(false);
  }
  logout() {
    this.close();
    this.logoutRequested.emit();
  }
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    if (!this.element.nativeElement.contains(event.target as Node)) this.close();
  }
  @HostListener('keydown.escape')
  onEscape() {
    if (this.searchOpen()) {
      this.closeSearch();
      return;
    }
    const id = this.activeMenu();
    this.close();
    if (id) this.element.nativeElement.querySelector<HTMLButtonElement>('#trigger-' + id)?.focus();
  }
}
