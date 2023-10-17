import * as fromMainPage from '../main-page/store/main-page.reducer';
import * as fromRecommendationForm from '../recommendation/store/recommendation.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromFindWine from '../find-wine/store/find-wine.reducer'
import * as fromWishlist from '../wishlist/store/wishlist.reducer'
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  mainPage: fromMainPage.MainPageState;
  recommendation: fromRecommendationForm.RecommendationFormState;
  auth: fromAuth.AuthState;
  findWinePage: fromFindWine.FindWineState;
  wishlistPage: fromWishlist.WishlistPageState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  mainPage: fromMainPage.mainPageReducer,
  recommendation: fromRecommendationForm.recommendationReducer,
  auth: fromAuth.authReducer,
  findWinePage: fromFindWine.findWineReducer,
  wishlistPage: fromWishlist.wishlistReducer,
};
