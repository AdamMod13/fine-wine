import * as fromMainPage from '../main-page/store/main-page.reducer';
import * as fromRecommendationForm from '../recommendation-form-modal/store/recommendation-form.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  mainPage: fromMainPage.MainPageState;
  recommendationPage: fromRecommendationForm.RecommendationFormState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  mainPage: fromMainPage.mainPageReducer,
  recommendationPage: fromRecommendationForm.recommendationFormReducer,
};
