import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "./registration.service";
import { Registration } from "./registration.model";
import { IonItemSliding, ModalController } from "@ionic/angular";
import { ShowRegComponent } from "./show-reg/show-reg.component";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.page.html",
  styleUrls: ["./registration.page.scss"],
})
export class RegistrationPage implements OnInit {
  adminDetails: any;
  regIds: [any];
  regDetails: Registration[];
  constructor(
    private regSrvc: RegistrationService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.fetchRegistrationDetails();
  }

  fetchRegistrationDetails() {
    this.adminDetails = JSON.parse(localStorage.getItem("_cap_authData")) as {
      userId: string;
      name: string;
      email: string;
      clgname: string;
      contact: string;
      token: string;
      expirationDate: string;
      registeredEvents: [string];
      registrationIDs: [string];
    };
    console.log(this.adminDetails);
    this.regIds = this.adminDetails.registrationIDs;
    console.log(this.regIds);
    this.regSrvc
      .getRegistrationInfo(
        this.adminDetails.token,
        this.adminDetails.registrationIDs
      )
      .subscribe((data) => {
        console.log(data.details);
        this.regDetails = data.details;
      });
    // console.log(this.adminDetails.userId);
  }
  onPreview(regData: Registration, slideItem: IonItemSliding) {
    slideItem.close();
    console.log(regData);
    this.modalCtrl
      .create({
        component: ShowRegComponent,
        componentProps: { registrationDetails: regData },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }
}
