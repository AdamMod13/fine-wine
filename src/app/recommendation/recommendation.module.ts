import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecommendedWinePageComponent} from "./recommended-wine-page/recommended-wine-page.component";
import {RecommendedWinePageRoutingModule} from "./recommendation.routing";
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";


@NgModule({
  declarations: [
    RecommendedWinePageComponent
  ],
  imports: [
    CommonModule,
    RecommendedWinePageRoutingModule,
    NgHeroiconsModule
  ]
})
export class RecommendationModule {
}
