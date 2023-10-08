import * as RecommendationFormActions from './recommendation.action';
import {Wine} from "../../Models/wine.model";

export interface RecommendationFormState {
  recommendedWines: Wine[];
}

const initialState: RecommendationFormState = {
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
    default:
      return state;
  }
}
