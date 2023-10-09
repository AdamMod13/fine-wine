import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NgHeroiconsModule} from "@dimaslz/ng-heroicons";
import {NgOptimizedImage} from "@angular/common";
import {StoreModule} from '@ngrx/store';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import * as fromApp from '../app/store/app.reducer';
import {MainPageEffects} from "./main-page/store/main-page.effects";
import {EffectsModule} from "@ngrx/effects";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {
  RecommendationFormModalComponent
} from './recommendation/recommendation-form-modal/recommendation-form-modal.component';
import {RecommendationEffects} from "./recommendation/store/recommendation.effects";
import {SpinnerComponent} from './spinner/spinner.component';
import {AuthEffects} from "./auth/store/auth.effects";
import {CoreModule} from "./core.module";
import {ErrorModalComponent} from './Shared/error-modal/error-modal.component';
import {AuthComponent} from './auth/auth.component'
import {FindWineEffects} from "./find-wine/store/find-wine.effects";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecommendationFormModalComponent,
    SpinnerComponent,
    ErrorModalComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgHeroiconsModule,
    NgOptimizedImage,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([MainPageEffects, RecommendationEffects, AuthEffects, FindWineEffects]),
    ReactiveFormsModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
