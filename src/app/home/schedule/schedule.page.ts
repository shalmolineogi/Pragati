import { Component, OnInit } from "@angular/core";
import { ScheduleService } from "./schedule.service";
import { Schedule } from "./schedule.model";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.page.html",
  styleUrls: ["./schedule.page.scss"],
})
export class SchedulePage implements OnInit {
  scheduleList: Schedule[];
  constructor(private scheduleServ: ScheduleService) {}

  ngOnInit() {
    this.fetchSchedules();
  }

  fetchSchedules() {
    this.scheduleServ.getSchedule().subscribe((schedules: Schedule[]) => {
      console.log(schedules);
      this.scheduleList = schedules;
    });
  }
}
