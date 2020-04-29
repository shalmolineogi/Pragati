import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// import { AngularFireDatabase } from "angularfire2/database";
import { EventsDetailService } from "../events-detail.service";
import { EventsDetail } from "../events-detail.model";
import { ModalController, AlertController } from "@ionic/angular";
// import { EveRegComponent } from 'src/app/registration/eve-reg/eve-reg.component';

import { EveRegComponent } from "../../../../registration/eve-reg/eve-reg.component";
import { Info } from "./info.model";

@Component({
  selector: "app-info",
  templateUrl: "./info.page.html",
  styleUrls: ["./info.page.scss"],
})
export class InfoPage implements OnInit {
  eventId: any;
  eventTypeId: any;
  // Events: any;
  _id: any;
  evename: String;
  desc: String;
  EventDetails: EventsDetail[];
  eveInfo: Info;
  constructor(
    private activateroute: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    // private db: AngularFireDatabase
    private eveDetSrvc: EventsDetailService // private eveInfo: Info
  ) {
    this.activateroute.paramMap.subscribe((res) => {
      if (res.has("eacheventId")) {
        console.log(
          res.get("eacheventId"),
          res.get("eventId"),
          this.activateroute
        );
        this.eventId = res.get("eacheventId");
        this.eventTypeId = res.get("eventId");
      }
    });
  }

  ngOnInit() {
    this.fetchEventDetails();
  }

  fetchEventDetails() {
    this.eveDetSrvc
      .getParticularTypeEventList(this.eventTypeId)
      .subscribe((data: EventsDetail[]) => {
        this.EventDetails = data;
        console.log(this.EventDetails);
        this.EventDetails.forEach((element) => {
          if (element._id == this.eventId) {
            this._id = element._id;
            this.evename = element.evename;
            this.desc = element.desc;

            this.eveInfo = element;
            console.log(element);
          }
        });
      });
  }
  private showAlert(msg: string) {
    this.alertCtrl
      .create({
        header: "Registration Status",
        message: msg,
        buttons: ["Okay"],
      })
      .then((alertEl) => alertEl.present());
  }
  onRegistration() {
    console.log(localStorage.getItem("_cap_authData"));
    const adminDetails = JSON.parse(localStorage.getItem("_cap_authData")) as {
      userId: string;
      name: string;
      email: string;
      clgname: string;
      contact: string;
      token: string;
      expirationDate: string;
      registeredEvents: [string];
    };
    let flag = true;
    adminDetails.registeredEvents.forEach((el) => {
      if (el == this.evename) {
        flag = false;
      }
    });

    if (flag) {
      this.modalCtrl
        .create({
          component: EveRegComponent,
          componentProps: {
            registeredEvent: this.eveInfo,
          },
        })
        .then((modalEl) => {
          modalEl.present();
          return modalEl.onDidDismiss();
        })
        .then((resData) => {
          console.log(resData.data, resData.role);
          if (resData.role == "success") {
            this.showAlert(resData.data.messege);
          }
        });
    } else {
      this.showAlert("Already registered for this event");
    }
  }
}
