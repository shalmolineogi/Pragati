import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EventsPage } from "./events.page";

const routes: Routes = [
  {
    path: "",
    component: EventsPage
  },
  {
    path: "events-detail",
    loadChildren: () =>
      import("./events-detail/events-detail.module").then(
        m => m.EventsDetailPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsPageRoutingModule {}
