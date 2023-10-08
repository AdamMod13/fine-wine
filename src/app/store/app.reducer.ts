import * as fromMainPage from '../main-page/store/main-page.reducer';
import * as fromRecommendationForm from '../recommendation/store/recommendation.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  mainPage: fromMainPage.MainPageState;
  recommendationPage: fromRecommendationForm.RecommendationFormState;
  auth: fromAuth.AuthState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  mainPage: fromMainPage.mainPageReducer,
  recommendationPage: fromRecommendationForm.recommendationReducer,
  auth: fromAuth.authReducer,
};
