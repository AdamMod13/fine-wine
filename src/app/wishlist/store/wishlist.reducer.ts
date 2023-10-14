import * as WishlistActions from './wishlist.action';
import {Wine} from "../../Models/wine.model";

export interface WishlistPageState {
  favouriteWine: Wine[],
}

const initialState: WishlistPageState = {
  favouriteWine: []
};

export function wishlistReducer(
  state: WishlistPageState = initialState,
  action: WishlistActions.WishlistActions
): WishlistPageState {
  switch (action.type) {
    case WishlistActions.SET_FAVOURITE_PAGE:
      if (action.payload) {
        return {
          ...state,
          favouriteWine: action.payload
        }
      } else {
        return {
          ...state,
          favouriteWine: [],
        };
      }
    default:
      return state;
  }
}
