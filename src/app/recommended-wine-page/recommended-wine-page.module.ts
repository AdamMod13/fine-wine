import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecommendedWinePageComponent} from "./recommended-wine-page.component";
import {RecommendedWinePageRoutingModule} from "./recommended-wine-page.routing";


@NgModule({
  declarations: [
    RecommendedWinePageComponent
  ],
  imports: [
    CommonModule,
    RecommendedWinePageRoutingModule
  ]
})
export class RecommendedWinePageModule {
}
