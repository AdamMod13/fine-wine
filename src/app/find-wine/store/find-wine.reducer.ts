import * as FindWineActions from './find-wine.action';
import {Wine} from "../../Models/wine.model";
import {WinePage} from "../../Models/winePage.model";

export interface FindWineState {
  winePage: WinePage | null;
  varieties: string[];
  wineries: string[];
  wines: Wine[];
}

const initialState: FindWineState = {
  winePage: null,
  varieties: [],
  wineries: [],
  wines: [],
};

export function findWineReducer(
  state: FindWineState = initialState,
  action: FindWineActions.FindWineActions
): FindWineState {
  switch (action.type) {
    case FindWineActions.SET_WINE_PAGE:
      if (action.payload.winePage) {
        let newWines = [...state.wines, ...action.payload.winePage.content]
        return {
          ...state,
          winePage: action.payload.winePage,
          wines: newWines,
          varieties: action.payload.randomVarieties,
          wineries: action.payload.randomWineries,
        }
      } else {
        return {
          ...state,
          wines: [],
        };
      }
    case FindWineActions.CLEAR_WINES:
      return {
        ...state,
        wines: []
      }
    default:
      return state;
  }
}
