import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import * as MainPageActions from './main-page.action';
import {Wine} from "../../Models/wine.model";

@Injectable()
export class MainPageEffects {
  fetchBestRandomWines = createEffect(() =>
    this.actions$.pipe(
      ofType(MainPageActions.FETCH_BEST_RANDOM_WINES),
      switchMap(() => {
        return this.http.get<Wine[]>(
          'http://localhost:8080/api/wine/getBestRandomWines'
        );
      }),
      map((wines) => {
        return new MainPageActions.SetBestRandomWines(wines);
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {
  }
}
