import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AuthComponent} from "./auth.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild([{path: '', component: AuthComponent}])
  ]
})
export class AuthModule {

}
