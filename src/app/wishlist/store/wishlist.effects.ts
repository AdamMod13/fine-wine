import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, tap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {SpinnerService} from "../../Shared/spinner/spinner.service";
import * as WishlistActions from "./wishlist.action";
import {Wine} from "../../Models/wine.model";

@Injectable()
export class WishlistEffects {
  fetchFavouritePage = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.FETCH_FAVOURITE_PAGE),
      switchMap((favouritePageReq: WishlistActions.FetchFavouritePage) => {
        this.spinnerService.setLoading(true);
        return this.http.post<Wine[]>(
          `http://localhost:8080/api/wine/get-favourites-wine-page/${favouritePageReq.payload.pageNumber}`,
          favouritePageReq.payload.userId
        )
      }),
      map((favouritePageRes: Wine[]) => {
        return new WishlistActions.SetFavouritePage(favouritePageRes);
      }),
      tap(() => this.spinnerService.setLoading(false)),
      catchError(() => {
        const errorMessage = 'An error occurred while fetching saved wines page.';
        this.spinnerService.setLoading(false);
        return throwError(errorMessage);
      }),
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
      catchError(() => {
        const errorMessage = 'An error occurred while fetching all saved wines.';
        this.spinnerService.setLoading(false);
        return throwError(errorMessage);
      }),
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
      }),
      tap(() => this.spinnerService.setLoading(false)),
      catchError(() => {
        const errorMessage = 'An error occurred while adding wine to favourites.';
        this.spinnerService.setLoading(false);
        return throwError(errorMessage);
      })
    ), {dispatch: false}
  );

  deleteWineFromFavourites = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.DELETE_WINE_FROM_FAVOURITES),
      switchMap((wineToDeleteReq: WishlistActions.DeleteWineFromFavourites) => {
        this.spinnerService.setLoading(true);
        return this.http.post<void>(
          'http://localhost:8080/api/wine/delete-favourite-wine',
          wineToDeleteReq.payload
        );
      }),
      tap(() => this.spinnerService.setLoading(false)),
      catchError(() => {
        const errorMessage = 'An error occurred while deleting wine from favourites.';
        this.spinnerService.setLoading(false);
        return throwError(errorMessage);
      }),
    ), {dispatch: false}
  );

  constructor(private actions$: Actions, private http: HttpClient, private spinnerService: SpinnerService) {
  }
}
