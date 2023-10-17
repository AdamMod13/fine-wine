import {Action} from '@ngrx/store';
import {FavouritePageReq} from "../../Models/favouritePageReq.model";
import {Wine} from "../../Models/wine.model";
import {WishlistReq} from "../../Models/WishlistReq.model";

export const FETCH_FAVOURITE_PAGE = '[Wishlist] Fetch favourite page';
export const SET_FAVOURITE_PAGE = '[Wishlist] Set favourite page';
export const ADD_WINE_TO_FAVOURITES = '[Wishlist] Add wine to favourites';
export const FETCH_ALL_FAVOURITES = '[Wishlist] Fetch all favourites';
export const SET_ALL_FAVOURITES = '[Wishlist] Set all favourites';
export const DELETE_WINE_FROM_FAVOURITES = '[Wishlist] Delete wine from favourites';
export const CLEAR_FAVOURITES = '[Wishlist] Clear favourites';

export class FetchFavouritePage implements Action {
  readonly type = FETCH_FAVOURITE_PAGE;

  constructor(public payload: FavouritePageReq) {
  }
}

export class FetchAllFavourites implements Action {
  readonly type = FETCH_ALL_FAVOURITES;

  constructor(public payload: string) {
  }
}

export class AddWineToFavourites implements Action {
  readonly type = ADD_WINE_TO_FAVOURITES;

  constructor(public payload: WishlistReq) {
  }
}

export class DeleteWineFromFavourites implements Action {
  readonly type = DELETE_WINE_FROM_FAVOURITES;

  constructor(public payload: WishlistReq) {
  }
}

export class SetFavouritePage implements Action {
  readonly type = SET_FAVOURITE_PAGE;

  constructor(public payload: Wine[]) {
  }
}

export class SetAllFavourites implements Action {
  readonly type = SET_ALL_FAVOURITES;

  constructor(public payload: Wine[]) {
  }
}

export class ClearFavourites implements Action {
  readonly type = CLEAR_FAVOURITES;

  constructor() {
  }
}

export type WishlistActions =
  | FetchFavouritePage
  | SetFavouritePage
  | AddWineToFavourites
  | FetchAllFavourites
  | SetAllFavourites
  | DeleteWineFromFavourites
  | ClearFavourites;
