import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, tap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {SpinnerService} from "../../spinner/spinner.service";
import * as FindWineActions from "./find-wine.action";
import {WinePageRes} from "../../Models/winePageRes.model";

@Injectable()
export class FindWineEffects {
  fetchAllWines = createEffect(() =>
    this.actions$.pipe(
      ofType(FindWineActions.FETCH_WINE_PAGE),
      switchMap((findWineReq: FindWineActions.FetchWinePage) => {
        return this.http.post<WinePageRes>(
          `http://localhost:8080/api/wine/get-all-wines/${findWineReq.payload.pageNumber}`,
          findWineReq.payload.findWineReq
        ).pipe(
          map((winePageRes) => {
            return new FindWineActions.SetWinePage(winePageRes);
          }),
          catchError(() => {
            const errorMessage = 'An error occurred while fetching wines.';
            this.spinnerService.setLoading(false);
            return throwError(errorMessage);
          }),
        );
      }),
      tap(() =>
        this.spinnerService.setLoading(false)
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient, private spinnerService: SpinnerService) {
  }
}
