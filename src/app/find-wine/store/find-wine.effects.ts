import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {SpinnerService} from "../../spinner/spinner.service";
import * as FindWineActions from "./find-wine.action";
import {WinePageRes} from "../../Models/winePageRes.model";

@Injectable()
export class FindWineEffects {
  fetchAllWines = createEffect(() =>
    this.actions$.pipe(
      ofType(FindWineActions.FETCH_ALL_WINES),
      switchMap((pageNumber: FindWineActions.FetchAllWines) => {
        return this.http.get<WinePageRes>(
          `http://localhost:8080/api/wine/get-all-wines/${pageNumber.payload}`
        );
      }),
      map((winePageRes) => {
        return new FindWineActions.SetWines(winePageRes);
      }),
      tap(() =>
        this.spinnerService.setLoading(false)
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient, private spinnerService: SpinnerService) {
  }
}
