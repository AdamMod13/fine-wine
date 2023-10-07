import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecommendedWinePageComponent} from "./recommended-wine-page.component";

const routes: Routes = [
  {
    path: '',
    component: RecommendedWinePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendedWinePageRoutingModule {
}
