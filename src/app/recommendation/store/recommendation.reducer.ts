import * as RecommendationFormActions from './recommendation.action';
import {Wine} from "../../Models/wine.model";
import {SavedRecommendationsRes} from "../../Models/savedRecommendationsRes.model";

export interface RecommendationFormState {
  varietiesFilter: string[];
  wineriesFilter: string[];
  filterType: string;
  recommendedWines: Wine[];
  isCurrentRecommendationSaved: boolean;
  savedRecommendations: SavedRecommendationsRes[];
  winesSelectOptions: Wine[];
}

const initialState: RecommendationFormState = {
  varietiesFilter: [],
  wineriesFilter: [],
  filterType: '',
  recommendedWines: [],
  isCurrentRecommendationSaved: false,
  savedRecommendations: [],
  winesSelectOptions: [],
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
        isCurrentRecommendationSaved: false
      };
    case RecommendationFormActions.SET_WINES_SELECT:
      return {
        ...state,
        winesSelectOptions: [...action.payload]
      };
    case RecommendationFormActions.CLEAR_RECOMMENDATIONS:
      return {
        ...state,
        recommendedWines: [],
        isCurrentRecommendationSaved: false
      }
    case RecommendationFormActions.SET_RECOMMENDATION_MODAL_FILTERS:
      return {
        ...state,
        varietiesFilter: [...action.payload.varieties],
        wineriesFilter: [...action.payload.wineries]
      }
    case RecommendationFormActions.SAVE_RECOMMENDATION:
      return {
        ...state,
        isCurrentRecommendationSaved: true
      }
    case RecommendationFormActions.SET_SAVED_RECOMMENDATIONS:
      return {
        ...state,
        savedRecommendations: action.payload
      }
    case RecommendationFormActions.SET_WINERY_OR_VARIETY:
      switch (action.payload.type) {
        case "VARIETY":
          return {
            ...state,
            varietiesFilter: [...action.payload.varieties],
            filterType: action.payload.type
          }
        case "WINERY":
          return {
            ...state,
            wineriesFilter: [...action.payload.wineries],
            filterType: action.payload.type
          }
        default:
          return {
            ...state,
            varietiesFilter: [...action.payload.varieties],
            wineriesFilter: [...action.payload.wineries],
            filterType: action.payload.type
          };
      }
    default:
      return state;
  }
}
