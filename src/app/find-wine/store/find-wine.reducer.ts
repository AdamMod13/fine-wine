import * as FindWineActions from './find-wine.action';
import {Wine} from "../../Models/wine.model";
import {WinePageRes} from "../../Models/winePageRes.model";

export interface FindWineState {
  winePage: WinePageRes | null;
  wines: Wine[];
}

const initialState: FindWineState = {
  winePage: null,
  wines: [],
};

export function findWineReducer(
  state: FindWineState = initialState,
  action: FindWineActions.FindWineActions
): FindWineState {
  switch (action.type) {
    case FindWineActions.SET_WINE_PAGE:
      if (action.payload.content) {
        return {
          ...state,
          winePage: action.payload,
          wines: action.payload.content
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
