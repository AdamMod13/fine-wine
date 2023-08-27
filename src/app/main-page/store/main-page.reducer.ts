import * as MainPageActions from './main-page.action';
import {Wine} from "../../Models/wine.model";

export interface MainPageState {
  bestRandomWines: Wine[];
}

const initialState: MainPageState = {
  bestRandomWines: [],
};

export function mainPageReducer(
  state: MainPageState = initialState,
  action: MainPageActions.MainPageActions
): MainPageState {
  switch (action.type) {
    case MainPageActions.SET_BEST_RANDOM_WINES:
      return {
        ...state,
        bestRandomWines: [...action.payload],
      };
    default:
      return state;
  }
}
