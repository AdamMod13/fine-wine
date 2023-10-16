import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FindWineRoutingModule} from "./find-wine-routing.module";
import {FindWineComponent} from "./find-wine.component";
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {CommonModule} from "@angular/common";
import {CoreModule} from "../core.module";

@NgModule({
  declarations: [FindWineComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FindWineRoutingModule,
    NgHeroiconsModule,
    FormsModule,
    CommonModule,
    CoreModule,
  ],
  exports: [],
  providers: [],
})
export class FindWineModule {
}
