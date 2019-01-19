import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { FrontOfficeActions } from './front-office.actions';

@Injectable()
export class FrontOfficeEffects {

  @Effect()
  private retrieveFrontOffice$ = this.actions$.pipe(ofType(FrontOfficeActions.RETRIEVE));
  constructor(private actions$: Actions) {}
}
