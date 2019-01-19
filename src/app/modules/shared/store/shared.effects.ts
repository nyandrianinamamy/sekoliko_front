import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { SharedActions } from './shared.actions';

@Injectable()
export class SharedEffects {

  @Effect()
  private retrieveShared$ = this.actions$.pipe(ofType(SharedActions.RETRIEVE));
  constructor(private actions$: Actions) {}
}
