import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthenticationActions } from './authentication.actions';

@Injectable()
export class AuthenticationEffects {

  @Effect()
  private retrieveAuthentication$ = this.actions$.pipe(ofType(AuthenticationActions.RETRIEVE));
  constructor(private actions$: Actions) {}
}
