import { Component, DestroyRef, Input, computed, inject, output, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { chargeableWeight, volumetricWeight, nonNegative } from '../../service/weight-calculation';
import { InternationalDropdowns } from '../../service/international/international-dropdowns';
import { InternationalRateQueryService } from '../../service/international/international-rate-query.service';
import { InternationalRateResult } from '../../service/international/models/international-rate.model';
import { ApiConfigurationService } from '../../service/rate-configuration';
import { ScrollToRate } from '../../scroll-to-rate';

function packageRow() {
  return new FormGroup({
    length: new FormControl<number | null>(null),
    width: new FormControl<number | null>(null),
    height: new FormControl<number | null>(null),
    actualWeight: new FormControl<number | null>(0),
  });
}

@Component({
  selector: 'app-international-rate-form',
  imports: [ReactiveFormsModule, DecimalPipe, ScrollToRate],
  providers: [InternationalDropdowns],
  templateUrl: './international-form.html',
  styleUrl: './international-form.css',
})
export class InternationalForm {
  @Input() pageMode = false;
  readonly rateCalculated = output<InternationalRateResult>();
  readonly maxBoxes = 100;
  readonly boxCountError = signal('');
  readonly dropdowns = inject(InternationalDropdowns);
  private readonly query = inject(InternationalRateQueryService);
  private readonly configuration = inject(ApiConfigurationService);
  private readonly destroyRef = inject(DestroyRef);
  private rateRequest?: Subscription;
  readonly loading = signal(false);
  readonly error = signal('');
  readonly result = signal<InternationalRateResult | null>(null);
  readonly shipment = new FormGroup({
    direction: new FormControl<'EXPORT' | 'IMPORT'>('IMPORT', { nonNullable: true }),
    product: new FormControl('', { nonNullable: true }),
    country: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    zipCode: new FormControl('', { nonNullable: true }),
  });
  readonly packages = new FormArray([packageRow()]);
  private readonly packageValues = toSignal(this.packages.valueChanges, { initialValue: this.packages.value });
  readonly totalWeight = computed(() => chargeableWeight(this.packageValues()));
  readonly volumetricWeight = volumetricWeight;

  constructor() {
    this.shipment.controls.direction.valueChanges.pipe(takeUntilDestroyed()).subscribe(direction => {
      this.shipment.controls.product.setValue('');
      this.dropdowns.clearProductClassifications();
      this.dropdowns.loadProductClassifications(direction);
    });
    this.shipment.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.clearResult());
    this.packages.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.clearResult());
  }

  private requestSnapshot(): string {
    return JSON.stringify({ shipment: this.shipment.getRawValue(), packages: this.packages.getRawValue() });
  }

  private clearResult(): void {
    this.rateRequest?.unsubscribe();
    this.rateRequest = undefined;
    this.result.set(null);
    this.error.set('');
  }

  getRate(): void {
    if (this.loading()) return;
    if (this.boxCountError()) return;
    this.error.set('');
    this.result.set(null);
    const config = this.configuration.configuration();
    if (!config.UserID || !config.UserPwd) {
      this.error.set('Please sign in again to calculate shipping rates.');
      return;
    }
    if (!config.AccountNo) {
      this.error.set('Your shipping account number is not available.');
      return;
    }
    const data = this.shipment.getRawValue();
    if (!data.product || !data.country) {
      this.error.set('Select the product and country first.');
      return;
    }
    this.loading.set(true);
    const snapshot = this.requestSnapshot();
    this.rateRequest = this.query.getRate({
      ...config,
      Orgn_Code: data.direction === 'EXPORT' ? 'EG' : data.country,
      Dest_Code: data.direction === 'EXPORT' ? data.country : 'EG',
      Serv_Type: '', Prod_Type: data.product, Ship_Wght: this.totalWeight(), Dimension: '',
      Sl1: data.city.trim(), Sl2: data.zipCode.trim(), Sl3: this.packages.length,
      AWBPackageData: this.packages.getRawValue().map(row => ({
        cl_AWBNo: '', cl_PkgId: '', cl_PCs: '',
        cl_DimL: String(nonNegative(row.length)), cl_DimW: String(nonNegative(row.width)), cl_DimH: String(nonNegative(row.height)),
      })),
    }).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))).subscribe({
      next: result => {
        if (this.boxCountError() || snapshot !== this.requestSnapshot()) return;
        this.result.set(result);
        this.rateCalculated.emit(result);
      },
      error: error => {
        if (this.boxCountError() || snapshot !== this.requestSnapshot()) return;
        this.error.set(error.message || 'Unable to calculate the international rate.');
      },
    });
  }

  resetBox(index: number): void {
    this.packages.at(index).setValue({ length: 0, width: 0, height: 0, actualWeight: 0 });
  }

  resetForm(): void {
    this.clearResult();
    this.shipment.reset({ direction: this.shipment.controls.direction.value, product: '', country: '', city: '', zipCode: '' }, { emitEvent: false });
    while (this.packages.length > 1) this.packages.removeAt(this.packages.length - 1, { emitEvent: false });
    this.packages.at(0).reset({ length: null, width: null, height: null, actualWeight: 0 });
    this.boxCountError.set('');
    this.error.set('');
    this.result.set(null);
  }

  setBoxCount(event: Event): void {
    this.clearResult();
    const input = event.target as HTMLInputElement;
    const count = Number(input.value);
    if (count > this.maxBoxes) {
      this.boxCountError.set(`You can calculate up to ${this.maxBoxes} boxes per shipment.`);
      this.result.set(null);
      return;
    }
    if (!Number.isSafeInteger(count) || count < 1) {
      this.boxCountError.set('Enter a whole number of boxes greater than zero.');
      this.result.set(null);
      return;
    }
    this.boxCountError.set('');
    if (count === this.packages.length) return;
    if (count > this.packages.length) {
      this.packages.push(Array.from({ length: count - this.packages.length }, () => packageRow()), { emitEvent: false });
    } else {
      while (this.packages.length > count) this.packages.removeAt(this.packages.length - 1, { emitEvent: false });
    }
    this.packages.updateValueAndValidity();
  }

  normalizeBoxCount(event: Event): void {
    if (this.boxCountError()) return;
    (event.target as HTMLInputElement).value = String(this.packages.length);
  }

  removeBox(index: number): void {
    if (this.packages.length > 1) this.packages.removeAt(index);
  }
}
