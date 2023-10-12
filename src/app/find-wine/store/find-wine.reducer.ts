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
        console.log(action.payload)
        return {
          ...state,
          winePage: action.payload.winePage,
          wines: action.payload.winePage.content,
          varieties: action.payload.randomVarieties,
          wineries: action.payload.randomWineries,
        }
      } else {
        return {
          ...state,
          wines: [],
        };
      }
    default:
      return state;
  }
}
