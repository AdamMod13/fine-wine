import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {SavedRecommendationsComponent} from "./saved-recommendations.component";
import {SavedRecommendationsRouting} from "./saved-recommendations.routing";


@NgModule({
  declarations: [
    SavedRecommendationsComponent,
  ],
  imports: [
    CommonModule,
    SavedRecommendationsRouting,
    NgHeroiconsModule
  ]
})
export class SavedRecommendationsModule {
}
