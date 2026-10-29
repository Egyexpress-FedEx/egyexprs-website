import { baseLink } from "./../../../../base/baseUrl";
import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { AccountDetials, AcountResponse } from "../interface/accountDetials";
import { Observable } from "rxjs";

@Service()
export class Pickup {
  http = inject(HttpClient);
  getAccountDetils(getForm: AccountDetials): Observable<AcountResponse> {
    return this.http.post<AcountResponse>(
      `${baseLink.baseUrl}GetAccountDetails`,
      getForm
    );
  }
  //

}
