import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FindWineRoutingModule} from "./find-wine-routing.module";
import {FindWineComponent} from "./find-wine.component";

@NgModule({
  declarations: [FindWineComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FindWineRoutingModule,
    FormsModule,
  ],
  exports: [],
  providers: [],
})
export class FindWineModule {
}
