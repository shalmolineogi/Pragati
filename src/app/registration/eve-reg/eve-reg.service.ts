import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Plugins } from "@capacitor/core";
import { EveReg } from "./eve-reg.model";
import { AdminDetails } from "./Admin.model";

export interface LoggedInUser {
  // messege: string;
  token: string;
  expiresIn: string;
  userId: string;
  email: string;
  name: string;
  clgname: string;
  contact: string;
}

@Injectable({
  providedIn: "root",
})
export class EveRegService {
  private userDet: LoggedInUser;
  // participants: EveReg[];
  constructor(private http: HttpClient) {}

  userDetails() {
    // console.log(localStorage.getItem("_cap_authData"));
    const adminDetails = JSON.parse(localStorage.getItem("_cap_authData")) as {
      userId: string;
      name: string;
      email: string;
      clgname: string;
      contact: string;
      token: string;
      expirationDate: string;
    };
    console.log(adminDetails.name);
    return adminDetails;

    // }));
  }

  register(
    teamname: String,
    // adminData: AdminDetails,
    token: String,
    evename: String,
    eveId: String,
    participantsDet: EveReg[],
    payAmt: Number
  ) {
    const regUser = {
      teamname: teamname,
      evename: evename,
      eveId: eveId,
      participants: participantsDet,
      payAmt: payAmt,
      // paymentStatus: false,
    };

    return this.http.post(
      "http://localhost:3000/api/registration/register",
      regUser,
      { headers: { authorization: "Bearer " + token } }
    );
  }
}
