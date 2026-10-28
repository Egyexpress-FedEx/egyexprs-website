import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { baseLink } from '../../../../../base/baseUrl';
import { ApiConfigurationService } from '../rate-configuration';
import {
  CountryItem,
  CountryListRequest,
  CountryListResponse,
} from './models/country-list.model';
import {
  ProductClassificationItem,
  ProductClassificationRequest,
  ProductClassificationResponse,
} from './models/product-classification.model';

export type ShipmentDirection = 'IMPORT' | 'EXPORT';

@Injectable({ providedIn: 'root' })
export class InternationalDropdowns {
  private readonly http = inject(HttpClient);
  private readonly configurationService = inject(ApiConfigurationService);
  private lastCountryRequestKey = '';
  private lastProductClassificationRequestKey = '';

  readonly countries = signal<CountryItem[]>([]);
  readonly countriesLoading = signal(false);
  readonly countriesError = signal<string | null>(null);
  readonly productClassifications = signal<ProductClassificationItem[]>([]);
  readonly productClassificationsLoading = signal(false);
  readonly productClassificationsError = signal<string | null>(null);

  loadCountries(): void {
    const configuration = this.configurationService.configuration();
    const requestKey = `${configuration.UserID}:${configuration.UserPwd}`;

    if (
      this.countriesLoading() ||
      (this.countries().length > 0 && requestKey === this.lastCountryRequestKey)
    ) {
      return;
    }

    if (!configuration.UserID.trim() || !configuration.UserPwd) {
      this.countriesError.set('Enter User ID and User Password first.');
      return;
    }

    const request: CountryListRequest = {
      Filter: " codeid<>'EG'",
      UserID: configuration.UserID,
      UserPwd: configuration.UserPwd,
    };

    this.countriesLoading.set(true);
    this.countriesError.set(null);
    this.countries.set([]);

    this.http
      .post<CountryListResponse>(`${baseLink.baseUrl.replace(/\/$/, '')}/GetCountryList`, request)
      .pipe(finalize(() => this.countriesLoading.set(false)))
      .subscribe({
        next: (response) => {
          if (response.Code !== '101') {
            this.countriesError.set(response.Description || 'Unable to load countries.');
            return;
          }

          this.lastCountryRequestKey = requestKey;
          this.countries.set(response.Response ?? []);
        },
        error: (error: HttpErrorResponse) => {
          this.countriesError.set(
            error.error?.Description || error.message || 'Unable to load countries.',
          );
        },
      });
  }

  clearProductClassifications(): void {
    this.productClassifications.set([]);
    this.productClassificationsError.set(null);
    this.lastProductClassificationRequestKey = '';
  }

  loadProductClassifications(direction: ShipmentDirection): void {
    const configuration = this.configurationService.configuration();
    const requestKey = [
      configuration.ActiveDataBase,
      configuration.UserID,
      configuration.UserPwd,
      direction,
    ].join(':');

    if (
      this.productClassificationsLoading() ||
      (this.productClassifications().length > 0 &&
        requestKey === this.lastProductClassificationRequestKey)
    ) {
      return;
    }

    if (!configuration.UserID.trim() || !configuration.UserPwd) {
      this.productClassificationsError.set('Enter User ID and User Password first.');
      return;
    }

    const request: ProductClassificationRequest = {
      Database: configuration.ActiveDataBase,
      Filter: ` and Category='I' and codename like '${direction}%'`,  
      MasterType: 'SERV',
      UserId: configuration.UserID,
      UserPwd: configuration.UserPwd,
    };

    this.productClassificationsLoading.set(true);
    this.productClassificationsError.set(null);
    this.productClassifications.set([]);

    this.http
      .post<ProductClassificationResponse>(`${baseLink.baseUrl.replace(/\/$/, '')}/MasterListFilter`, request)
      .pipe(finalize(() => this.productClassificationsLoading.set(false)))
      .subscribe({
        next: (response) => {
          if (response.Code !== '101') {
            this.productClassificationsError.set(
              response.Description || 'Unable to load product classifications.',
            );
            return;
          }

          this.lastProductClassificationRequestKey = requestKey;
          this.productClassifications.set(response.Response ?? []);
        },
        error: (error: HttpErrorResponse) => {
          this.productClassificationsError.set(
            error.error?.Description ||
              error.message ||
              'Unable to load product classifications.',
          );
        },
      });
  }
}
