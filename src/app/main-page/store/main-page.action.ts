import {Action} from '@ngrx/store';
import {Wine} from "../../Models/wine.model";

export const FETCH_BEST_RANDOM_WINES = "[Main Page] Fetch Best Random Wines";
export const SET_BEST_RANDOM_WINES = "[Main Page] Set Best Random Wines";
export const ADD_WINE_TO_FAVOURITES = "[Main Page] Add wine to favourites";

export class FetchBestRandomWines implements Action {
  readonly type = FETCH_BEST_RANDOM_WINES;
}

export class SetBestRandomWines implements Action {
  readonly type = SET_BEST_RANDOM_WINES;

  constructor(public payload: Wine[]) {
  }
}

export class AddWineToFavourites implements Action {
  readonly type = ADD_WINE_TO_FAVOURITES;

  constructor(public payload: Wine) {
  }
}

export type MainPageActions =
  | FetchBestRandomWines
  | SetBestRandomWines
  | AddWineToFavourites;
