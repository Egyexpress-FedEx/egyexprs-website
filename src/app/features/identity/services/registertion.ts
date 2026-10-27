import { Request } from './../interface/register';
import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { accResponse, CityResponse, getCity, RegisterForGetAccData, responseaafterregist } from '../interface/register';
import { Observable } from 'rxjs';
import { baseLink } from '../../../base/baseUrl';

@Service()
export class Registertion {
     http = inject(HttpClient);

  getaccountDetials(dataAcc: RegisterForGetAccData): Observable<accResponse> {
    return this.http.post<accResponse>(
      `${baseLink.baseUrl}GetAccountMasterDetails`,
      dataAcc
    );
  }
//
  getcity(citys: getCity): Observable<CityResponse> {
    return this.http.post<CityResponse>(
      `${baseLink.baseUrl}GetCityListFilterWise`,
      citys
    );
  }
  //
  registerNow(registData: Request): Observable<responseaafterregist> {
    return this.http.post<responseaafterregist>(
      `${baseLink.baseUrl}CreateOnlineUser`,
      registData
    );
  }
}
