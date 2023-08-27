import * as fromMainPage from '../main-page/store/main-page.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  mainPage: fromMainPage.MainPageState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  mainPage: fromMainPage.mainPageReducer,
};
