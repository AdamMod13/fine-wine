import {Action} from '@ngrx/store';
import {FindWineReq} from "../../Models/findWineReq.model";
import {FindWineRes} from "../../Models/findWineRes.model";

export const FETCH_WINE_PAGE = "[Find Wine] Fetch wine page";
export const SET_WINE_PAGE = "[Find Wine] Set wine page";
export const SET_RANDOM_VARIETIES = "[Find Wine] Set random varieties";
export const CLEAR_WINES = "[Find Wine] Clear wines";

export class FetchWinePage implements Action {
  readonly type = FETCH_WINE_PAGE;

  constructor(public payload: { pageNumber: number, findWineReq: FindWineReq }) {
  }
}

export class SetWinePage implements Action {
  readonly type = SET_WINE_PAGE;

  constructor(public payload: FindWineRes) {
  }
}

export class SetRandomVarieties implements Action {
  readonly type = SET_RANDOM_VARIETIES;

  constructor(public payload: string[]) {
  }
}

export class ClearWines implements Action {
  readonly type = CLEAR_WINES;

  constructor() {
  }
}

export type FindWineActions =
  | FetchWinePage
  | SetWinePage
  | SetRandomVarieties
  | ClearWines;
