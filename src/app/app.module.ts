import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './main-page/navbar/navbar.component';
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {WineCarouselComponent} from './main-page/wine-carousel/wine-carousel.component';
import {NgOptimizedImage} from "@angular/common";
import {MainPageComponent} from './main-page/main-page.component';
import {StoreModule} from '@ngrx/store';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import * as fromApp from '../app/store/app.reducer';
import {MainPageEffects} from "./main-page/store/main-page.effects";
import {EffectsModule} from "@ngrx/effects";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WineCarouselComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgHeroiconsModule,
    NgOptimizedImage,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([MainPageEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
