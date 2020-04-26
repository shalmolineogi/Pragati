import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsDetailPageRoutingModule } from './events-detail-routing.module';

import { EventsDetailPage } from './events-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsDetailPageRoutingModule
  ],
  declarations: [EventsDetailPage]
})
export class EventsDetailPageModule {}
