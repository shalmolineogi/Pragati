import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePage } from "./home.page";

const routes: Routes = [
  {
    path: "",
    component: HomePage,
  },
  {
    path: "events",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./events/events.module").then((m) => m.EventsPageModule),
      },
      {
        path: ":eventId",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./events/events-detail/events-detail.module").then(
                (m) => m.EventsDetailPageModule
              ),
          },
          {
            path: ":eacheventId",
            loadChildren: () =>
              import("./events/events-detail/info/info.module").then(
                (m) => m.InfoPageModule
              ),
          },
        ],
      },
    ],
  },
  {
    path: "schedule",
    loadChildren: () =>
      import("./schedule/schedule.module").then((m) => m.SchedulePageModule),
  },
  {
    path: "gallery",
    loadChildren: () =>
      import("./gallery/gallery.module").then((m) => m.GalleryPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
