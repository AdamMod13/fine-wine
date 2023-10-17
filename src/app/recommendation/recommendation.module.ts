import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecommendedWinePageComponent} from "./recommended-wine-page/recommended-wine-page.component";
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {RecommendedWineRoutingModule} from "./recommendation.routing";


@NgModule({
  declarations: [
    RecommendedWinePageComponent,
  ],
  imports: [
    CommonModule,
    RecommendedWineRoutingModule,
    NgHeroiconsModule
  ]
})
export class RecommendationModule {
}
