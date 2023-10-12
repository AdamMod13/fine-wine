import {Action} from '@ngrx/store';
import {Wine} from "../../Models/wine.model";
import {WineRecommendationReq} from "../../Models/WineRecommendationReq.model";
import {RecommendationModalFiltersRes} from "../../Models/recommendationModalFiltersRes.model";

export const FETCH_RECOMMENDATIONS = '[Recommendation Form] Fetch recommendations';
export const SET_RECOMMENDATIONS = '[Recommendation Form] Set recommendations';
export const CLEAR_RECOMMENDATIONS = '[Recommendation Form] Clear recommendations';
export const SAVE_CURRENT_RECOMMENDATIONS = '[Recommendation Form] Save current recommendations';
export const GET_CURRENT_RECOMMENDATIONS = '[Recommendation Form] Get current recommendations';
export const GET_RECOMMENDATION_MODAL_FILTERS = '[Recommendation Form] Get recommendation modal filters';
export const SET_RECOMMENDATION_MODAL_FILTERS = '[Recommendation Form] Set recommendation modal filters';

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

export class SaveCurrentRecommendations implements Action {
  readonly type = SAVE_CURRENT_RECOMMENDATIONS;

  constructor(public payload: Wine[]) {
  }
}

export class GetCurrentRecommendations implements Action {
  readonly type = GET_CURRENT_RECOMMENDATIONS;

  constructor() {
  }
}

export class GetRecommendationModalFilters implements Action {
  readonly type = GET_RECOMMENDATION_MODAL_FILTERS;

  constructor() {
  }
}

export class SetRecommendationModalFilters implements Action {
  readonly type = SET_RECOMMENDATION_MODAL_FILTERS;

  constructor(public payload: RecommendationModalFiltersRes) {
  }
}

export class ClearRecommendations implements Action {
  readonly type = CLEAR_RECOMMENDATIONS;
}

export type RecommendationFormActions =
  | FetchRecommendations
  | ClearRecommendations
  | SetRecommendations
  | SaveCurrentRecommendations
  | GetCurrentRecommendations
  | GetRecommendationModalFilters
  | SetRecommendationModalFilters;
