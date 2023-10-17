import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SavedRecommendationsComponent} from "./saved-recommendations.component";

const routes: Routes = [
  {
    path: '',
    component: SavedRecommendationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedRecommendationsRouting {
}
