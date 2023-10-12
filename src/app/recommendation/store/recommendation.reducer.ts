import * as RecommendationFormActions from './recommendation.action';
import {Wine} from "../../Models/wine.model";

export interface RecommendationFormState {
  varietiesFilter: string[];
  wineriesFilter: string[];
  recommendedWines: Wine[];
}

const initialState: RecommendationFormState = {
  varietiesFilter: [],
  wineriesFilter: [],
  recommendedWines: []
};

export function recommendationReducer(
  state: RecommendationFormState = initialState,
  action: RecommendationFormActions.RecommendationFormActions
): RecommendationFormState {
  switch (action.type) {
    case RecommendationFormActions.SET_RECOMMENDATIONS:
      return {
        ...state,
        recommendedWines: [...action.payload],
      };
    case RecommendationFormActions.CLEAR_RECOMMENDATIONS:
      return {
        ...state,
        recommendedWines: []
      }
    case RecommendationFormActions.SET_RECOMMENDATION_MODAL_FILTERS:
      return {
        ...state,
        varietiesFilter: [...action.payload.varieties],
        wineriesFilter: [...action.payload.wineries]
      };
    default:
      return state;
  }
}
