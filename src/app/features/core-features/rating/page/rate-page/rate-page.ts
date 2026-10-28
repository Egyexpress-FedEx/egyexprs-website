import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { AuthState } from '../../../../../shared/stats/auth-state';
import { DomRate } from '../../domestic/dom-rate/dom-rate';
import { InternationalForm } from '../../international/international-form/international-form';
import { DomesticRateBreakdown } from '../../service/domestic/models/rate-query.model';
import { InternationalRateResult } from '../../service/international/models/international-rate.model';

@Component({
  imports: [DomRate, InternationalForm, DecimalPipe],
  selector: 'app-rate-page',
  styleUrl: './rate-page.css',
  templateUrl: './rate-page.html',
})
export class RatePage {
  readonly auth = inject(AuthState);
  readonly domesticResult = signal<DomesticRateBreakdown | null>(null);
  readonly internationalResult = signal<InternationalRateResult | null>(null);
  @ViewChild('resultDialog', { static: true }) resultDialog!: ElementRef<HTMLDialogElement>;

  showDomestic(rate: DomesticRateBreakdown): void {
    this.internationalResult.set(null);
    this.domesticResult.set(rate);
    this.resultDialog.nativeElement.showModal();
  }
  showInternational(rate: InternationalRateResult): void {
    this.domesticResult.set(null);
    this.internationalResult.set(rate);
    this.resultDialog.nativeElement.showModal();
  }
  closeResult(): void { this.resultDialog.nativeElement.close(); }
  onBackdrop(event: MouseEvent): void {
    const dialog = this.resultDialog.nativeElement;
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) this.closeResult();
  }
}
