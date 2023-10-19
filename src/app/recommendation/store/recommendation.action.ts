import {Action} from '@ngrx/store';
import {Wine} from "../../Models/wine.model";
import {WineRecommendationReq} from "../../Models/wineRecommendationReq.model";
import {RecommendationModalFiltersRes} from "../../Models/recommendationModalFiltersRes.model";
import {SavedRecommendationsRes} from "../../Models/savedRecommendationsRes.model";

export const FETCH_RECOMMENDATIONS = '[Recommendation Form] Fetch recommendations';
export const SET_RECOMMENDATIONS = '[Recommendation Form] Set recommendations';
export const CLEAR_RECOMMENDATIONS = '[Recommendation Form] Clear recommendations';
export const SAVE_CURRENT_RECOMMENDATIONS = '[Recommendation Form] Save current recommendations';
export const GET_CURRENT_RECOMMENDATIONS = '[Recommendation Form] Get current recommendations';
export const GET_RECOMMENDATION_MODAL_FILTERS = '[Recommendation Form] Get recommendation modal filters';
export const SET_RECOMMENDATION_MODAL_FILTERS = '[Recommendation Form] Set recommendation modal filters';
export const SEARCH_WINERY_OR_VARIETY = '[Recommendation Form] Search winery or variety';
export const SET_WINERY_OR_VARIETY = '[Recommendation Form] Set winery or variety';
export const SAVE_RECOMMENDATION = '[Saved Recommendation] Save recommendation';
export const GET_SAVED_RECOMMENDATIONS = '[Saved Recommendation] Get saved recommendations';
export const SET_SAVED_RECOMMENDATIONS = '[Saved Recommendation] Set saved recommendations';

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

export class SaveRecommendation implements Action {
  readonly type = SAVE_RECOMMENDATION;

  constructor(public payload: { userId: string, wineIds: number[] }) {
  }
}


export class GetCurrentRecommendations implements Action {
  readonly type = GET_CURRENT_RECOMMENDATIONS;

  constructor() {
  }
}

export class GetSavedRecommendations implements Action {
  readonly type = GET_SAVED_RECOMMENDATIONS;

  constructor(public payload: string) {
  }
}

export class SetSavedRecommendations implements Action {
  readonly type = SET_SAVED_RECOMMENDATIONS;

  constructor(public payload: SavedRecommendationsRes[]) {
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

export class SearchWineryOrVariety implements Action {
  readonly type = SEARCH_WINERY_OR_VARIETY;

  constructor(public payload: { value: string, type: string }) {
  }
}

export class SetWineryOrVariety implements Action {
  readonly type = SET_WINERY_OR_VARIETY;

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
  | SetRecommendationModalFilters
  | SearchWineryOrVariety
  | SetWineryOrVariety
  | SaveRecommendation
  | GetSavedRecommendations
  | SetSavedRecommendations;
