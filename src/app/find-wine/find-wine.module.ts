import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FindWineRoutingModule} from "./find-wine-routing.module";
import {FindWineComponent} from "./find-wine.component";
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {CommonModule} from "@angular/common";
import {CountryCodePipe} from "../Shared/country-code.pipe";

@NgModule({
  declarations: [FindWineComponent, CountryCodePipe],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FindWineRoutingModule,
    NgHeroiconsModule,
    FormsModule,
    CommonModule,
  ],
  exports: [],
  providers: [],
})
export class FindWineModule {
}
