import { Component, Input, inject, output, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AccountOffer } from '../../account-offer/account-offer';
import { AuthState } from '../../../../../shared/stats/auth-state';
import { Dropdowns } from '../../service/domestic/dropdowns';
import { DomesticRateQueryService } from '../../service/domestic/domestic-rate-query.service';
import { DomesticRateBreakdown } from '../../service/domestic/models/rate-query.model';
import { volumetricWeight } from '../../service/weight-calculation';
import { ScrollToRate } from '../../scroll-to-rate';

@Component({
  imports: [AccountOffer, FormsModule, DecimalPipe, ScrollToRate],
  providers: [Dropdowns],
  selector: 'app-dom-rate',
  styleUrl: './dom-rate.css',
  templateUrl: './dom-rate.html',
})
export class DomRate {
  @Input() pageMode = false;
  readonly rateCalculated = output<DomesticRateBreakdown>();
  readonly auth = inject(AuthState);
  readonly dropdowns = inject(Dropdowns);
  private readonly query = inject(DomesticRateQueryService);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly result = signal<DomesticRateBreakdown | null>(null);
  readonly rateForm = {
    Prod_Type: '', Serv_Type: '', Orgn_Code: '', Dest_Code: '',
    Ship_Wght: null as number | null, numberOfPieces: 1,
    width: null as number | null, height: null as number | null, length: null as number | null,
  };

  clearResult(): void { this.result.set(null); this.error.set(''); }
  resetForm(): void {
    Object.assign(this.rateForm, { Prod_Type: '', Serv_Type: '', Orgn_Code: '', Dest_Code: '', Ship_Wght: null, numberOfPieces: 1, width: null, height: null, length: null });
    this.clearResult();
  }

  get dimensionalWeight(): number { return volumetricWeight(this.rateForm); }
  get billableWeight(): number { return Math.max(this.rateForm.Ship_Wght || 0, this.dimensionalWeight); }

  getRate(): void {
    if (this.loading()) return;
    this.clearResult();
    const data = this.rateForm;
    if (!data.Prod_Type || !data.Serv_Type || !data.Orgn_Code || !data.Dest_Code ||
        !Number.isFinite(data.Ship_Wght) || !data.Ship_Wght || data.Ship_Wght <= 0) {
      this.error.set('Complete all shipment fields and enter a weight greater than zero.');
      return;
    }
    this.loading.set(true);
    this.query.getRate({
      Prod_Type: data.Prod_Type, Serv_Type: data.Serv_Type,
      Orgn_Code: data.Orgn_Code, Dest_Code: data.Dest_Code, Ship_Wght: this.billableWeight,
    }).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: result => { this.result.set(result); this.rateCalculated.emit(result); },
      error: error => this.error.set(error.error?.Description || error.message || 'Unable to calculate the rate.'),
    });
  }
}
