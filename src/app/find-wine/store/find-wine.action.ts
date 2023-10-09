import {Action} from '@ngrx/store';
import {WinePageRes} from "../../Models/winePageRes.model";

export const FETCH_ALL_WINES = "[Find Wine] Fetch all wines";
export const SET_WINES = "[Find Wine] Set wines";

export class FetchAllWines implements Action {
  readonly type = FETCH_ALL_WINES;

  constructor(public payload: number) {
  }
}

export class SetWines implements Action {
  readonly type = SET_WINES;

  constructor(public payload: WinePageRes) {
  }
}

export type FindWineActions =
  | FetchAllWines
  | SetWines;
