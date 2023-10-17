import * as WishlistActions from './wishlist.action';
import {Wine} from "../../Models/wine.model";

export interface WishlistPageState {
  allFavourites: Wine[],
  favouriteWinePage: Wine[],
}

const initialState: WishlistPageState = {
  allFavourites: [],
  favouriteWinePage: []
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
          favouriteWinePage: [...state.favouriteWinePage, ...action.payload]
        }
      } else {
        return {
          ...state,
          favouriteWinePage: [],
        };
      }
    case WishlistActions.SET_ALL_FAVOURITES:
      return {
        ...state,
        allFavourites: action.payload
      }
    case WishlistActions.ADD_WINE_TO_FAVOURITES:
      return {
        ...state,
        allFavourites: [...state.allFavourites, action.payload.wine]
      }
    case WishlistActions.DELETE_WINE_FROM_FAVOURITES:
      return {
        ...state,
        allFavourites: [...state.allFavourites.filter(wine => wine.id !== action.payload.wine.id)]
      }
    case WishlistActions.CLEAR_FAVOURITES:
      return {
        ...state,
        favouriteWinePage: [],
        allFavourites: []
      }
    default:
      return state;
  }
}
