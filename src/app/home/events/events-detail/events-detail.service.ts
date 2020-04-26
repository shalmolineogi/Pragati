import { Injectable } from "@angular/core";
import { EventsPage } from "../events.page";
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventsDetailService {
  uri = "http://localhost:3000";

  constructor(
    // private evePg: EventsPage,
    private http: HttpClient
  ) {}

  getParticularTypeEventList(_id: string) {
    // console.log(`${this.uri}/api/events/eventTypes/${_id}`);
    return this.http.get(`${this.uri}/api/events/eventTypes/${_id}`);
  }
}
