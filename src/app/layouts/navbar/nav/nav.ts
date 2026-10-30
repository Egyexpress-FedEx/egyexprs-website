import { Component, ElementRef, HostListener, ViewChild, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthState } from '../../../shared/stats/auth-state';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  readonly authState = inject(AuthState);
  readonly activeMenu = signal<string | null>(null);
  readonly mobileOpen = signal(false);
  readonly searchOpen = signal(false);
  readonly searchQuery = signal('');
  readonly searchRecommendations = [
    { label: 'About', route: '/home', destination: 'about', keywords: 'about us company about egxpress من نحن عن الشركة عنا عن ايجي اكسبريس نبذة عن الشركة' },
    { label: 'Complain', route: '/home', destination: 'complain', keywords: 'complaint complaints file complain شكوى شكوي شكاوى شكاوي تقديم شكوى' },
    { label: 'ContactUs', route: '/home', destination: 'contact-us', keywords: 'contact us support تواصل معنا اتصل بنا اتصل بينا تواصل معانا خدمة العملاء' },
    { label: 'Track', route: '/home', destination: 'track', keywords: 'tracking shipment tracking تتبع تتبع الشحنة تتبع شحنتك تتبع شحنتي' },
    { label: 'Create shipments', route: '/home', destination: 'create-shipments', keywords: 'ship shipping shipment إنشاء شحنة انشاء شحنة شحن شحنات ارسل شحنة' },
    { label: 'Create Pickup', route: '/home', destination: 'create-pickup', keywords: 'pickup pick up schedule pickup إنشاء طلب استلام انشاء طلب استلام طلب استلام حجز استلام استلام شحنة' },
    { label: 'Get rate', route: '/home', destination: 'get-rate', keywords: 'rates price pricing quote احسب السعر احسب سعر الشحن اسعار أسعار تكلفة الشحن تسعير' },
    { label: 'Service', route: '/home', destination: 'services', keywords: 'services logistics خدمات خدماتنا الخدمات خدمة خدمات الشحن' },
    { label: 'News', route: '/home', destination: 'news', keywords: 'news updates أخبار اخبار أخبارنا اخبارنا آخر الأخبار اخر الاخبار' },
    { label: 'Our location', route: '/home', destination: 'our-location', keywords: 'locations branches branch offices فروعنا فروع الفروع مواقعنا' },
    { label: 'Supply request', route: '/home', destination: 'supply-request', keywords: 'supplies packaging supply request طلب مستلزمات مستلزمات الشحن طلب مواد تغليف تغليف' },
    { label: 'FAQs', route: '/home', destination: 'faqs', keywords: 'faq questions help الأسئلة الشائعة الاسئلة الشائعة أسئلة شائعة اسئلة شائعة سؤال مساعدة' },
  ];
  private normalizeSearch(value: string) { return value.toLowerCase().replace(/[\u064b-\u065f\u0670\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/[^a-z0-9\u0600-\u06ff]/g, ''); }
  readonly filteredRecommendations = computed(() => {
    const query = this.normalizeSearch(this.searchQuery());
    return this.searchRecommendations.filter(item => !query || this.normalizeSearch(item.label).includes(query) || this.normalizeSearch(item.keywords).includes(query));
  });
  submitSearch(event: Event) {
    event.preventDefault();
    if (!this.searchQuery().trim()) return;
    const exact = this.searchRecommendations.find(item => this.normalizeSearch(item.label) === this.normalizeSearch(this.searchQuery()));
    const match = exact ?? this.filteredRecommendations()[0];
    if (match) {
      void this.router.navigate([this.searchRoute(match)], { queryParams: this.searchParams(match) });
      this.closeSearch();
    }
  }
  searchRoute(item: { route: string; destination: string }): string {
    if (item.destination === 'create-pickup') return '/shipping/pickups/schedule';
    if (item.destination === 'get-rate') return this.authState.isLoggedIn() ? '/rate' : '/home/rate/domestic';
    return item.route;
  }
  searchParams(item: { destination: string }): { destination: string } | null {
    return item.destination === 'create-pickup' || item.destination === 'get-rate' ? null : { destination: item.destination };
  }
  readonly scrolled = signal(false);
  readonly language = signal<'AR' | 'EN'>('EN');
  @ViewChild('searchInput')
  set searchInput(field: ElementRef<HTMLInputElement> | undefined) {
    field?.nativeElement.focus();
  }
  openSearch() {
    this.close();
    this.searchQuery.set('');
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
    { id: 'news', label: 'NEWS', heading: 'News & Insights', image: 'News.png', links: ['Blogs', 'News', 'Articles'], action: null },
  ];
  constructor(private readonly element: ElementRef<HTMLElement>, private readonly router: Router) {
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
    this.authState.clearCredentials();
    this.close();
    void this.router.navigateByUrl('/login');
  }
  async openRates(event: MouseEvent): Promise<void> {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const destination = this.authState.isLoggedIn() ? '/rate' : '/home/rate/domestic';
    await this.router.navigateByUrl(destination);
    this.close();
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
