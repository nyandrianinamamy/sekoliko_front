import { Action } from '@ngrx/store';

export const SharedActions = {
  RETRIEVE: 'SHARED--RETRIEVE'
};

export class Retrieve implements Action {
  public readonly type = SharedActions.RETRIEVE;
}
