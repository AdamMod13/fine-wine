import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './main-page/navbar/navbar.component';
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {WineCarouselComponent} from './main-page/wine-carousel/wine-carousel.component';
import {NgOptimizedImage} from "@angular/common";
import {MainPageComponent} from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WineCarouselComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    NgHeroiconsModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
