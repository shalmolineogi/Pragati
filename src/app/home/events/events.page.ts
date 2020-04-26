import { Component, OnInit, Input } from "@angular/core";
import { EventsService } from "./events.service";
import { Observable, Subscription } from "rxjs";
import * as FireDB from "firebase";
import { environment } from "src/environments/environment";
import { stringify } from "querystring";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { map } from "rxjs/operators";
import { NavController } from "@ionic/angular";
import { EventTypes } from "./events.model";

@Component({
  selector: "app-events",
  templateUrl: "./events.page.html",
  styleUrls: ["./events.page.scss"],
})
export class EventsPage implements OnInit {
  // events: any;
  // Eventlist: any[];

  eventlist: EventTypes[];
  eventId: any;
  eventType: string;

  constructor(
    private evntSrvc: EventsService // private db: AngularFireDatabase
  ) {}

  //Evetype: string;
  ngOnInit() {
    this.getEventTypes();
  }
  getEventTypes() {
    this.evntSrvc.getEveList().subscribe((eve: EventTypes[]) => {
      console.log(eve);
      this.eventlist = eve;
      console.log("logging here: ", this.eventlist);
      // console.log(this.eventlist[0]._id);
    });
  }
  onAdd(_id: any, evetype: string) {
    this.eventId = _id;
    this.eventType = evetype;
    // console.log(this.eventId);
  }
}
