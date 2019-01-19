import { Action } from '@ngrx/store';

import { createSharedState } from '../types/shared-state/shared-state.functions';
import { SharedState } from '../types/shared-state/shared-state.interface';

import { SharedActions } from './shared.actions';

export function sharedReducer(
  state: SharedState = createSharedState(),
  action: Action
): SharedState {
  switch (action.type) {
    case SharedActions.RETRIEVE:
      return {
        ...state
      };
    default:
      return state;
  }
}
