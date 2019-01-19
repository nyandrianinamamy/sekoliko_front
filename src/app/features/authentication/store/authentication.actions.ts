import { Action } from '@ngrx/store';

export const AuthenticationActions = {
  RETRIEVE: 'AUTHENTICATION--RETRIEVE'
};

export class Retrieve implements Action {
  public readonly type = AuthenticationActions.RETRIEVE;
}
