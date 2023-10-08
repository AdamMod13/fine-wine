import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import * as MainPageActions from './main-page.action';
import {Wine} from "../../Models/wine.model";
import {SpinnerService} from "../../spinner/spinner.service";

@Injectable()
export class MainPageEffects {
  fetchBestRandomWines = createEffect(() =>
    this.actions$.pipe(
      ofType(MainPageActions.FETCH_BEST_RANDOM_WINES),
      switchMap(() => {
        return this.http.get<Wine[]>(
          'http://localhost:8080/api/wine/get-best-random-wines'
        );
      }),
      map((wines) => {
        return new MainPageActions.SetBestRandomWines(wines);
      }),
      tap(() => setTimeout(() => {
        this.spinnerService.setLoading(false)
      }, 1500))
    )
  );

  addWineToFavourites = createEffect(() =>
    this.actions$.pipe(
      ofType(MainPageActions.ADD_WINE_TO_FAVOURITES),
      tap((wineToAdd: MainPageActions.AddWineToFavourites) => {
        return this.http.post<Wine>(
          'http://localhost:8080/api/wine/add-wine-to-favourites',
          wineToAdd.payload
        );
      })
    ), {dispatch: true}
  );

  constructor(private actions$: Actions, private http: HttpClient, private spinnerService: SpinnerService) {
  }
}
