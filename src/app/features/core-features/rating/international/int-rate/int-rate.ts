import { Component, inject } from '@angular/core';
import { AccountOffer } from '../../account-offer/account-offer';
import { AuthState } from '../../../../../shared/stats/auth-state';
import { InternationalForm } from '../international-form/international-form';

@Component({
  imports: [AccountOffer, InternationalForm],
  selector: 'app-int-rate',
  styleUrl: './int-rate.css',
  templateUrl: './int-rate.html',
})
export class IntRate {
  readonly auth = inject(AuthState);
}
