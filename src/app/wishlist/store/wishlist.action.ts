import {Action} from '@ngrx/store';
import {FavouritePageReq} from "../../Models/FavouritePageReq.model";
import {Wine} from "../../Models/wine.model";

export const FETCH_FAVOURITE_PAGE = "[Find Wine] Fetch favourite page";
export const SET_FAVOURITE_PAGE = "[Find Wine] Set favourite page";

export class FetchFavouritePage implements Action {
  readonly type = FETCH_FAVOURITE_PAGE;

  constructor(public payload: FavouritePageReq) {
  }
}

export class SetFavouritePage implements Action {
  readonly type = SET_FAVOURITE_PAGE;

  constructor(public payload: Wine[]) {
  }
}

export type WishlistActions =
  | FetchFavouritePage
  | SetFavouritePage;
