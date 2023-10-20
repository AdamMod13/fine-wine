import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SavedRecommendationsComponent} from "./saved-recommendations.component";
import {AuthGuard} from "../auth/auth.guard";
import {getUserSavedRecommendationsResolver} from "./saved-recommendations-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: SavedRecommendationsComponent,
    canActivate: [AuthGuard],
    resolve: {savedRecommendations: getUserSavedRecommendationsResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedRecommendationsRouting {
}
