import { Component, OnInit, Input } from "@angular/core";
import { Registration } from "../registration.model";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-show-reg",
  templateUrl: "./show-reg.component.html",
  styleUrls: ["./show-reg.component.scss"],
})
export class ShowRegComponent implements OnInit {
  @Input() registrationDetails: Registration;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  onCancel() {
    this.modalCtrl.dismiss(null, "close");
  }
}
