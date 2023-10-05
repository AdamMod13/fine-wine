import * as NavbarActions from './navbar.action';

export interface NavbarState {
}

const initialState: NavbarState = {};

export function navbarReducer(
  state: NavbarState = initialState,
  action: NavbarActions.NavbarActions
): NavbarState {
  switch (action.type) {
    default:
      return state;
  }
}
