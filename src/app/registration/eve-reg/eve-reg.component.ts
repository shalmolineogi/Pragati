import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  NgForm,
} from "@angular/forms";
import { Info } from "../../home/events/events-detail/info/info.model";
import { ModalController, AlertController } from "@ionic/angular";
import { AuthService } from "../../auth/auth.service";
import { Plugins } from "@capacitor/core";
import { EveReg } from "./eve-reg.model";
import { EveRegService } from "./eve-reg.service";
import { format } from "url";
import { AdminDetails } from "./Admin.model";

@Component({
  selector: "app-eve-reg",
  templateUrl: "./eve-reg.component.html",
  styleUrls: ["./eve-reg.component.scss"],
})
export class EveRegComponent implements OnInit {
  @Input() registeredEvent: Info;
  private count: number = 0;
  maxcount: number = 4;
  adminData: AdminDetails;
  participantsDet = [];
  participants = [];
  mckvAmt = 200;
  nonmckvAmt = 400;
  payAmt: Number = this.mckvAmt;
  userId: string;
  name: string;
  email: string;
  clgname: string;
  contact: string;
  token: string;
  expirationDate: string;
  constructor(
    private modalCtrl: ModalController,
    private authSrvc: AuthService,
    private eveRegSrvc: EveRegService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loggedInUserDetails();
  }
  onCancel() {
    this.modalCtrl.dismiss(null, "close");
  }
  loggedInUserDetails() {
    console.log(localStorage.getItem("_cap_authData"));
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
    this.adminData = adminDetails;
    console.log(this.adminData);
    if (this.adminData.clgname !== "MCKVIE") {
      this.payAmt = this.nonmckvAmt;
    }
    this.participantsDet.push({
      participantNo: 0,
      name: adminDetails.name,
      clgname: adminDetails.clgname,
      email: adminDetails.email,
      contact: adminDetails.contact,
    });
  }
  // onRegister() {
  //   this.modalCtrl.dismiss({ msg: "Registered" }, "confirm");
  // }
  onAddParticipant() {
    if (this.participants.length < this.maxcount) {
      this.participants.push({
        id: this.participants.length + 1,
        name: "",
        clgname: "",
        email: "",
        contact: "",
      });
      this.count = this.count + 1;
      console.log(this.participants);
    } else {
      this.showAlert("Can't add more participant");
    }
  }
  private showAlert(msg: string) {
    this.alertCtrl
      .create({
        header: "Add Participant Failed",
        message: msg,
        buttons: ["Okay"],
      })
      .then((alertEl) => alertEl.present());
  }
  onSubmit(form: NgForm) {
    this.participants.forEach((el) => {
      this.participantsDet.push({
        participantNo: el.id,
        name: el.name,
        clgname: el.clgname,
        email: el.email,
        contact: el.contact,
      });
    });
    console.log(this.participantsDet);
    this.eveRegSrvc
      .register(
        form.value.team,
        // this.adminData,
        this.adminData.token,
        this.registeredEvent.evename,
        this.registeredEvent._id,
        this.participantsDet,
        this.payAmt
      )
      .subscribe(
        (resData: any) => {
          console.log("Rsponse: ", resData.messege);
          if (resData) {
            this.modalCtrl.dismiss(resData, "success");
          }
        },
        (err) => {
          if (err) {
            this.showAlert(err.error.messege);
            // form.reset();
          }
          console.log("Error:", err.error.messege);
        }
      );
  }
  // logValue() {
  //   let flag = 0;
  //   this.participants.forEach((el) => {
  //     if (el.clgname != "MCKVIE") {
  //       flag = 1;
  //     }
  //   });
  //   if (flag == 1) {
  //     this.payAmt = this.nonmckvAmt;
  //   } else {
  //     this.payAmt = this.mckvAmt;
  //   }
  //   console.log(this.participants);
  // }
  removeParticipants(i: number) {
    this.participants.splice(i, 1);
    this.count = this.count - 1;
  }
  onClgChange($event) {
    // console.log($event.target.value);
    if ($event.target.value === "MCKVIE") {
      this.payAmt = this.mckvAmt;
    } else {
      this.payAmt = this.nonmckvAmt;
    }
  }

  hide_and_see(item) {
    console.log(item);

    let item_body = document
      .getElementById(`part_${item}`)
      .querySelector(".card-body");
    console.log(item_body);
    // item_body.style.display =
    //   item_body.style.display == "none" ? "block" : "none";
    styles: ["item-body{display==none?block:none}"];
  }
}
