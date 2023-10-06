import {NgModule} from '@angular/core';
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {WineCarouselComponent} from './wine-carousel/wine-carousel.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MainPageComponent} from './main-page.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MainPageRoutingModule} from "./main-page-routing.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    MainPageComponent,
    WineCarouselComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgHeroiconsModule,
    NgOptimizedImage,
    MainPageRoutingModule,
  ],
  providers: [],
  bootstrap: []
})
export class MainPageModule {
}
