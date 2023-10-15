import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {SpinnerService} from "../../spinner/spinner.service";
import * as WishlistActions from "./wishlist.action";
import {Wine} from "../../Models/wine.model";

@Injectable()
export class WishlistEffects {
  fetchFavouritePage = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.FETCH_FAVOURITE_PAGE),
      switchMap((favouritePageReq: WishlistActions.FetchFavouritePage) => {
        return this.http.post<Wine[]>(
          `http://localhost:8080/api/wine/get-favourites-wine-page/${favouritePageReq.payload.pageNumber}`,
          favouritePageReq.payload.userId
        )
      }),
      map((favouritePageRes: Wine[]) => {
        return new WishlistActions.SetFavouritePage(favouritePageRes);
      }),
      tap(() => this.spinnerService.setLoading(false))
    )
  );

  fetchAllFavourites = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.FETCH_ALL_FAVOURITES),
      switchMap((favouritePageReq: WishlistActions.FetchAllFavourites) => {
        return this.http.post<Wine[]>(
          `http://localhost:8080/api/wine/get-all-favourites`,
          favouritePageReq.payload
        )
      }),
      map((favouritePageRes: Wine[]) => {
        return new WishlistActions.SetAllFavourites(favouritePageRes);
      }),
      tap(() => this.spinnerService.setLoading(false))
    )
  );

  addWineToFavourites = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.ADD_WINE_TO_FAVOURITES),
      switchMap((wineToAddReq: WishlistActions.AddWineToFavourites) => {
        return this.http.post<void>(
          'http://localhost:8080/api/wine/save-favourite-wine',
          wineToAddReq.payload
        );
      })
    ), {dispatch: false}
  );

  constructor(private actions$: Actions, private http: HttpClient, private spinnerService: SpinnerService) {
  }
}
