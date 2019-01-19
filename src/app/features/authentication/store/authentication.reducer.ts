import { Action } from '@ngrx/store';

import { createAuthenticationState } from '../types/authentication-state/authentication-state.functions';
import { AuthenticationState } from '../types/authentication-state/authentication-state.interface';

import { AuthenticationActions } from './authentication.actions';

export function authenticationReducer(
  state: AuthenticationState = createAuthenticationState(),
  action: Action
): AuthenticationState {
  switch (action.type) {
    case AuthenticationActions.RETRIEVE:
      return {
        ...state
      };
    default:
      return state;
  }
}
