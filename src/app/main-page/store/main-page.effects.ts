import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, tap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import * as MainPageActions from './main-page.action';
import {Wine} from "../../Models/wine.model";
import {SpinnerService} from "../../Shared/spinner/spinner.service";

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
      }, 1500)),
      catchError(() => {
        const errorMessage = 'An error occurred while fetching wines.';
        this.spinnerService.setLoading(false);
        return throwError(errorMessage);
      }),
    )
  );

  constructor(private actions$: Actions, private http: HttpClient, private spinnerService: SpinnerService) {
  }
}
