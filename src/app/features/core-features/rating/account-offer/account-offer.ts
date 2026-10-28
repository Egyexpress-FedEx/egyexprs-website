import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rate-account-offer',
  imports: [RouterLink],
  template: `<aside class="account-offer" aria-label="Business account rates">
    <span class="offer-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m3 12 9-9h7l2 2v7l-9 9-9-9Z"/><circle cx="16.5" cy="7.5" r="1.5"/><path d="m9 11 4 4"/></svg></span>
    <div class="offer-copy"><span class="offer-eyebrow">MORE VALUE FOR YOUR BUSINESS</span><h3>Ship more. Save with a business account.</h3><p>Open an account to access preferential shipping rates tailored to your business.</p></div>
    <a routerLink="/open-account">Open an account <span aria-hidden="true">↗</span></a>
  </aside>`,
  styleUrl: './account-offer.css',
})
export class AccountOffer {}
