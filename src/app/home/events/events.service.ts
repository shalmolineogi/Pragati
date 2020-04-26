import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable, from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import * as fire from "firebase";
@Injectable({
  providedIn: "root",
})
export class EventsService {
  // eventsList: any[];
  uri = "http://localhost:3000";
  constructor(private http: HttpClient) {}
  // fetchEvent() {
  //   return this.db
  //     .get("https://tech-fest-7ebba.firebaseio.com/events.json")
  //     .pipe(
  //       tap(resdata => {
  //         console.log(resdata);
  //       })
  //     );
  // }
  getEveList() {
    return this.http.get(`${this.uri}/api/events/eventTypes/`);
  }

  //console.log(this.eventsList);
}
