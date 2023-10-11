import {Action} from '@ngrx/store';
import {WinePageRes} from "../../Models/winePageRes.model";
import {FindWineReq} from "../../Models/findWineReq.model";

export const FETCH_WINE_PAGE = "[Find Wine] Fetch wine page";
export const SET_WINE_PAGE = "[Find Wine] Set wine page";

export class FetchWinePage implements Action {
  readonly type = FETCH_WINE_PAGE;

  constructor(public payload: { pageNumber: number, findWineReq: FindWineReq }) {
  }
}

export class SetWinePage implements Action {
  readonly type = SET_WINE_PAGE;

  constructor(public payload: WinePageRes) {
  }
}

export type FindWineActions =
  | FetchWinePage
  | SetWinePage;
