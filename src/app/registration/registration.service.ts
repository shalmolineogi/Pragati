import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
export interface RegData {
  details: [any];
}
@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  getRegistrationInfo(token: String, regIds: [string]) {
    const regDet = {
      regIds: regIds,
    };
    return this.http.post<RegData>(
      "http://localhost:3000/api/registration/getdetails",
      regDet,
      { headers: { authorization: "Bearer " + token } }
    );
  }
}
