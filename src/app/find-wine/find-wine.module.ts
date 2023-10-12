import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FindWineRoutingModule} from "./find-wine-routing.module";
import {FindWineComponent} from "./find-wine.component";
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [FindWineComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FindWineRoutingModule,
    NgHeroiconsModule,
    FormsModule,
    CommonModule
  ],
  exports: [],
  providers: [],
})
export class FindWineModule {
}
