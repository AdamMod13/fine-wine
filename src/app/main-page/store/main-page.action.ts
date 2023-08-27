// @ts-ignore
import {Action} from '@ngrx/store';
import {Wine} from "../../Models/wine.model";

export const FETCH_BEST_RANDOM_WINES = "[Main Page] Fetch Best Random Wines";
export const SET_BEST_RANDOM_WINES = "[Main Page] Set Best Random Wines";

export class FetchBestRandomWines implements Action {
  readonly type = FETCH_BEST_RANDOM_WINES;
}

export class SetBestRandomWines implements Action {
  readonly type = SET_BEST_RANDOM_WINES;

  constructor(public payload: Wine[]) {
  }
}

export type MainPageActions =
  | FetchBestRandomWines
  | SetBestRandomWines;
