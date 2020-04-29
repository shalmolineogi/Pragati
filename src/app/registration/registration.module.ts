import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RegistrationPageRoutingModule } from "./registration-routing.module";

import { RegistrationPage } from "./registration.page";
import { ShowRegComponent } from "./show-reg/show-reg.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
  ],
  declarations: [RegistrationPage, ShowRegComponent],
  entryComponents: [ShowRegComponent],
})
export class RegistrationPageModule {}
