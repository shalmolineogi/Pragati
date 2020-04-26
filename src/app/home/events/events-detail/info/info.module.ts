import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { InfoPageRoutingModule } from "./info-routing.module";

import { InfoPage } from "./info.page";
import { EveRegComponent } from "../../../../registration/eve-reg/eve-reg.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, InfoPageRoutingModule],
  declarations: [InfoPage, EveRegComponent],
  entryComponents: [EveRegComponent],
})
export class InfoPageModule {}
