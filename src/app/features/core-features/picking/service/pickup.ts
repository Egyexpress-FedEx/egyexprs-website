import { baseLink } from "./../../../../base/baseUrl";
import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { AccountDetials, AcountResponse } from "../interface/accountDetials";
import { Observable } from "rxjs";
import { PickingRequest, pickupRes } from "../interface/pickup-work";

import { PickupListRequest, PickupListResponse } from '../interface/pickup-list';

@Service()
export class Pickup {
  http = inject(HttpClient);

  getPickupList(request: PickupListRequest): Observable<PickupListResponse> {
    return this.http.post<PickupListResponse>(`${baseLink.baseUrl}BookingQuery`, request);
  }
  getAccountDetils(getForm: AccountDetials): Observable<AcountResponse> {
    return this.http.post<AcountResponse>(
      `${baseLink.baseUrl}GetAccountDetails`,
      getForm
    );
  }
  //
  CreateSchedPickup(pickForm:PickingRequest): Observable<pickupRes> {
    return this.http.post<pickupRes>(
      `${baseLink.baseUrl}CreateBooking`,
      pickForm
    );
  }
}
