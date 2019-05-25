import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { IonicPageModule } from "ionic-angular";

import { SignupPage } from "./signup";


@NgModule({
  declarations: [],
  imports: [
    IonicPageModule.forChild(SignupPage),
    TranslateModule.forChild(),
    ReactiveFormsModule
  ],
  exports: []
})
export class SignupPageModule {}
