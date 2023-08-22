import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {WineCarouselComponent} from './wine-carousel/wine-carousel.component';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WineCarouselComponent
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
