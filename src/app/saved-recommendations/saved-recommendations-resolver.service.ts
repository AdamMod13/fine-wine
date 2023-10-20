import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {Wine} from "../Models/wine.model";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import {first} from "rxjs/operators";
import {tap} from "rxjs";
import * as RecommendationFormActions from "../recommendation/store/recommendation.action";

export const getUserSavedRecommendationsResolver: ResolveFn<Wine[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const store = inject(Store<fromApp.AppState>);

  return store.pipe(
    tap(() => {
      store.select("auth").pipe().subscribe((auth) => {
        if (auth.user) {
          console.log(auth)
          store.dispatch(new RecommendationFormActions.GetSavedRecommendations(auth.user.id))
        }
      })
    }),
    first()
  );
};
