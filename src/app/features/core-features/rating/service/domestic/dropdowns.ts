import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { baseLink } from '../../../../../base/baseUrl';
import { ApiConfigurationService } from '../rate-configuration';
import {
  ProductItem,
  ProductListRequest,
  ProductListResponse,
} from './models/product-list.model';
import {
  ServiceItem,
  ServiceListRequest,
  ServiceListResponse,
} from './models/service-list.model';
import { CityItem, CityListRequest, CityListResponse } from './models/city-list.model';

@Injectable({ providedIn: 'root' })
export class Dropdowns {
  private readonly http = inject(HttpClient);
  private readonly configurationService = inject(ApiConfigurationService);
  private lastProductRequestKey = '';
  private lastServiceRequestKey = '';
  private lastCityRequestKey = '';
  readonly products = signal<ProductItem[]>([]);
  readonly productsLoading = signal(false);
  readonly productsError = signal<string | null>(null);
  readonly services = signal<ServiceItem[]>([]);
  readonly servicesLoading = signal(false);
  readonly servicesError = signal<string | null>(null);
  readonly cities = signal<CityItem[]>([]);
  readonly citiesLoading = signal(false);
  readonly citiesError = signal<string | null>(null);

  loadProducts(): void {
    const configuration = this.configurationService.domesticConfiguration();
    const requestKey = `${configuration.UserID}:${configuration.UserPwd}`;

    if (
      this.productsLoading() ||
      (this.products().length > 0 && requestKey === this.lastProductRequestKey)
    ) {
      return;
    }

    if (!configuration.UserID.trim() || !configuration.UserPwd) {
      this.productsError.set('Enter User ID and User Password first.');
      return;
    }

    const request: ProductListRequest = {
      MasterType: 'PROD',
      UserId: configuration.UserID,
      UserPwd: configuration.UserPwd,
    };

    this.productsLoading.set(true);
    this.productsError.set(null);
    this.products.set([]);

    this.http
      .post<ProductListResponse>(`${baseLink.baseUrl.replace(/\/$/, '')}/MasterList`, request)
      .pipe(finalize(() => this.productsLoading.set(false)))
      .subscribe({
        next: (response) => {
          if (response.Code !== '101') {
            this.productsError.set(response.Description || 'Unable to load products.');
            return;
          }

          this.lastProductRequestKey = requestKey;
          this.products.set(response.Response ?? []);
        },
        error: (error: HttpErrorResponse) => {
          this.productsError.set(
            error.error?.Description || error.message || 'Unable to load products.',
          );
        },
      });
  }

  loadServices(): void {
    const configuration = this.configurationService.domesticConfiguration();
    const requestKey = `${configuration.UserID}:${configuration.UserPwd}`;

    if (
      this.servicesLoading() ||
      (this.services().length > 0 && requestKey === this.lastServiceRequestKey)
    ) {
      return;
    }

    if (!configuration.UserID.trim() || !configuration.UserPwd) {
      this.servicesError.set('Enter User ID and User Password first.');
      return;
    }

    const request: ServiceListRequest = {
      Filter: " and Category<>'I'",
      MasterType: 'SERV',
      UserId: configuration.UserID,
      UserPwd: configuration.UserPwd,
    };

    this.servicesLoading.set(true);
    this.servicesError.set(null);
    this.services.set([]);

    this.http
      .post<ServiceListResponse>(`${baseLink.baseUrl.replace(/\/$/, '')}/MasterListFilter`, request)
      .pipe(finalize(() => this.servicesLoading.set(false)))
      .subscribe({
        next: (response) => {
          if (response.Code !== '101') {
            this.servicesError.set(response.Description || 'Unable to load services.');
            return;
          }

          this.lastServiceRequestKey = requestKey;
          this.services.set(response.Response ?? []);
        },
        error: (error: HttpErrorResponse) => {
          this.servicesError.set(
            error.error?.Description || error.message || 'Unable to load services.',
          );
        },
      });
  }

  loadCities(): void {
    const configuration = this.configurationService.domesticConfiguration();
    const requestKey = `${configuration.UserID}:${configuration.UserPwd}`;

    if (
      this.citiesLoading() ||
      (this.cities().length > 0 && requestKey === this.lastCityRequestKey)
    ) {
      return;
    }

    if (!configuration.UserID.trim() || !configuration.UserPwd) {
      this.citiesError.set('Enter User ID and User Password first.');
      return;
    }

    const request: CityListRequest = {
      Filter: "CodeType='CITY' and AreaCode='EG' ",
      UserID: configuration.UserID,
      UserPwd: configuration.UserPwd,
    };

    this.citiesLoading.set(true);
    this.citiesError.set(null);
    this.cities.set([]);

    this.http
      .post<CityListResponse>(`${baseLink.baseUrl.replace(/\/$/, '')}/GetCityListFilterWise`, request)
      .pipe(finalize(() => this.citiesLoading.set(false)))
      .subscribe({
        next: (response) => {
          if (response.Code !== '101') {
            this.citiesError.set(response.Description || 'Unable to load cities.');
            return;
          }

          this.lastCityRequestKey = requestKey;
          this.cities.set(response.Response ?? []);
        },
        error: (error: HttpErrorResponse) => {
          this.citiesError.set(
            error.error?.Description || error.message || 'Unable to load cities.',
          );
        },
      });
  }
}
