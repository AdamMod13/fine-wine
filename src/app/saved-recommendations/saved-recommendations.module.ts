import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {SavedRecommendationsComponent} from "./saved-recommendations.component";
import {SavedRecommendationsRouting} from "./saved-recommendations.routing";
import {CoreModule} from "../core.module";


@NgModule({
  declarations: [
    SavedRecommendationsComponent,
  ],
  imports: [
    CommonModule,
    SavedRecommendationsRouting,
    NgHeroiconsModule,
    CoreModule
  ]
})
export class SavedRecommendationsModule {
}
