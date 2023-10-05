import {Action} from '@ngrx/store';
import {Wine} from "../../Models/wine.model";
import {WineRecommendationReq} from "../../Models/WineRecommendationReq.model";

export const FETCH_RECOMMENDATIONS = '[Navbar] Fetch recommendations';
export const SET_RECOMMENDATIONS = '[Navbar] Set recommendations'

export class FetchRecommendations implements Action {
  readonly type = FETCH_RECOMMENDATIONS;

  constructor(public payload: WineRecommendationReq) {
  }
}

export class SetRecommendations implements Action {
  readonly type = SET_RECOMMENDATIONS;

  constructor(public payload: Wine[]) {
  }
}

export type NavbarActions =
  | FetchRecommendations
  | SetRecommendations;
