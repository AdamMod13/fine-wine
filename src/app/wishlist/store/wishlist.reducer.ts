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
      console.log("HERE")
      if (action.payload) {
        return {
          ...state,
          favouriteWine: [...state.favouriteWine, ...action.payload]
        }
      } else {
        return {
          ...state,
          favouriteWine: [],
        };
      }
    case WishlistActions.SET_ALL_FAVOURITES:
      return {
        ...state,
        favouriteWine: action.payload
      }
    case WishlistActions.ADD_WINE_TO_FAVOURITES:
      return {
        ...state,
        favouriteWine: [...state.favouriteWine, action.payload.wine]
      }
    case WishlistActions.DELETE_WINE_FROM_FAVOURITES:
      return {
        ...state,
        favouriteWine: [...state.favouriteWine.filter(wine => wine.id !== action.payload.wine.id)]
      }
    case WishlistActions.CLEAR_FAVOURITES:
      return {
        ...state,
        favouriteWine: []
      }
    default:
      return state;
  }
}
