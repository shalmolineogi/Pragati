import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ScheduleService {
  uri = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getSchedule() {
    return this.http.get(`${this.uri}/api/schedule/all`);
  }
}
