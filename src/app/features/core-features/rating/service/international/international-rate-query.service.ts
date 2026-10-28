import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { baseLink } from '../../../../../base/baseUrl';
import {
  InternationalRateApiResponse,
  InternationalRateCharge,
  InternationalRateRequest,
  InternationalRateResult,
} from './models/international-rate.model';

@Injectable({ providedIn: 'root' })
export class InternationalRateQueryService {
  private readonly http = inject(HttpClient);

  getRate(request: InternationalRateRequest): Observable<InternationalRateResult> {
    return this.http
      .post<InternationalRateApiResponse>(`${baseLink.baseUrl.replace(/\/$/, '')}/RateQueryIntDetailed`, request)
      .pipe(
        map((response) => this.parseResponse(response)),
        catchError((error: HttpErrorResponse | Error) =>
          throwError(() => this.toError(error)),
        ),
      );
  }

  private parseResponse(response: InternationalRateApiResponse): InternationalRateResult {
    if (response.code !== '1') {
      throw new Error(response.Description || 'Unable to calculate the international rate.');
    }

    let items: InternationalRateCharge[];

    try {
      items = JSON.parse(response.JasonString || '[]') as InternationalRateCharge[];
    } catch {
      throw new Error('The international rate response has an invalid format.');
    }

    const total = items.find(
      (item) => item.slno === 100 || item.ChargesDescription.trim().toLowerCase() === 'total charges',
    );
    const charges = items.filter((item) => item !== total);

    return {
      charges,
      totalUsd: total?.Amount ?? charges.reduce((sum, item) => sum + item.Amount, 0),
      totalEgp: total?.AmountBC ?? charges.reduce((sum, item) => sum + item.AmountBC, 0),
    };
  }

  private toError(error: HttpErrorResponse | Error): Error {
    if (error instanceof HttpErrorResponse) {
      return new Error(
        error.error?.Description || error.message || 'Unable to calculate the international rate.',
      );
    }

    return error;
  }
}
