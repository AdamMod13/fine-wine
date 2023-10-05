import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import * as NavbarActions from './navbar.action';
import {Wine} from "../../Models/wine.model";

@Injectable()
export class NavbarEffects {
  fetchRecommendations = createEffect(() =>
    this.actions$.pipe(
      ofType(NavbarActions.FETCH_RECOMMENDATIONS),
      switchMap(() => {
        return this.http.get<Wine[]>(
          'http://localhost:8080/api/wine/get-recommendations'
        );
      }),
      map((wines) => {
        return new NavbarActions.SetRecommendations(wines);
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {
  }
}
