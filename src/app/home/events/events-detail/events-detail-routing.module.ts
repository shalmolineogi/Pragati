import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EventsDetailPage } from "./events-detail.page";

const routes: Routes = [
  {
    path: "",
    component: EventsDetailPage
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsDetailPageRoutingModule {}
