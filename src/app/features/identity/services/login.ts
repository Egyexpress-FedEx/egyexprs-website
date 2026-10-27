import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { loginRequest, LoginResponse } from "../interface/login";
import { Observable } from "rxjs";
import { baseLink } from "../../../base/baseUrl";

@Service()
export class Login {
  http = inject(HttpClient);

  login(loginreq: loginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${baseLink.baseUrl}GetIConnectLogin`,
      loginreq
    );
  }
}
