import { Component, OnInit } from "@angular/core";
import { EventsDetail } from "./events-detail.model";
import { EventsPage } from "../events.page";

import * as dataBase from "firebase";
import { Events } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";
import { EventsDetailService } from "./events-detail.service";
@Component({
  selector: "app-events-detail",
  templateUrl: "./events-detail.page.html",
  styleUrls: ["./events-detail.page.scss"],
})
export class EventsDetailPage implements OnInit {
  Eventlist: EventsDetail[];
  eventType: String;
  ref: string;
  // primaryRef: string;

  // private eventname: String;
  constructor(
    private activatedRoute: ActivatedRoute,
    private evntDetSrvc: EventsDetailService
  ) {
    this.activatedRoute.paramMap.subscribe((res) => {
      if (res.has("eventId")) {
        console.log(res.get("eventId"));
        // this.primaryRef = "/events/";
        this.ref = res.get("eventId");
      }
    });
  }

  ngOnInit() {
    this.fetchEventsNames();
  }
  fetchEventsNames() {
    this.evntDetSrvc
      .getParticularTypeEventList(this.ref)
      .subscribe((evenames: EventsDetail[]) => {
        this.Eventlist = evenames;
        // this.eventType = this.evePg.eventType;
        // this.Eventlist.forEach((element) => {
        // if (element.ref == this.ref) {
        //   this.eventType = element.evename;
        // }
        // });
      });
  }
}
