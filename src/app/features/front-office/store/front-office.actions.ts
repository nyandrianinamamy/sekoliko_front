import { Action } from '@ngrx/store';

export const FrontOfficeActions = {
  RETRIEVE: 'FRONT_OFFICE--RETRIEVE'
};

export class Retrieve implements Action {
  public readonly type = FrontOfficeActions.RETRIEVE;
}
