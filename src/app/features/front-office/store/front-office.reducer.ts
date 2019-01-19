import { Action } from '@ngrx/store';

import { createFrontOfficeState } from '../types/front-office-state/front-office-state.functions';
import { FrontOfficeState } from '../types/front-office-state/front-office-state.interface';

import { FrontOfficeActions } from './front-office.actions';

export function frontOfficeReducer(
  state: FrontOfficeState = createFrontOfficeState(),
  action: Action
): FrontOfficeState {
  switch (action.type) {
    case FrontOfficeActions.RETRIEVE:
      return {
        ...state
      };
    default:
      return state;
  }
}
