import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecommendedWinePageComponent} from "./recommended-wine-page/recommended-wine-page.component";
import {getCurrentRecommendationResolver} from "./recommended-wine-page/recommended-wine-page-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: RecommendedWinePageComponent,
    resolve: {currentRecommendedWine: getCurrentRecommendationResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendedWinePageRoutingModule {
}
