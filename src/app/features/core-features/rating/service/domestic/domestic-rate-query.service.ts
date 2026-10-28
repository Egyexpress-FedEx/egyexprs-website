import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { baseLink } from '../../../../../base/baseUrl';
import { ApiConfigurationService } from '../rate-configuration';
import {
  DomesticRateBreakdown,
  RateQueryFields,
  RateQueryResponse,
} from './models/rate-query.model';

@Injectable({ providedIn: 'root' })
export class DomesticRateQueryService {
  private readonly http = inject(HttpClient);
  private readonly configurationService = inject(ApiConfigurationService);

  getRate(fields: RateQueryFields): Observable<DomesticRateBreakdown> {
    const configuration = this.configurationService.domesticConfiguration();

    if (
      !configuration.AccountNo.trim() ||
      !configuration.ActiveDataBase.trim() ||
      !configuration.UserID.trim() ||
      !configuration.UserPwd
    ) {
      return throwError(() => new Error(configuration.UserID && !configuration.UserPwd
        ? 'Please sign in again to calculate shipping rates.'
        : 'Domestic account details are not available for rate calculation.'));
    }

    const request = this.configurationService.withConfiguration(fields);

    return this.http
      .post<RateQueryResponse>(`${baseLink.baseUrl.replace(/\/$/, '')}/RateQuery`, request)
      .pipe(
        map((response) => {
          if (response.code !== '1') {
            throw new Error(response.Description || 'Unable to calculate the rate.');
          }

          const rates = JSON.parse(response.JasonString) as DomesticRateBreakdown[];
          const rate = rates[0];

          if (!rate) {
            throw new Error('The rate response did not contain any results.');
          }

          return rate;
        }),
      );
  }
}
