import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/types/app-state/app-state.interface';

import { AppStore } from '../../../store/app.store';
import { FrontOfficeState } from '../types/front-office-state/front-office-state.interface';

import { Retrieve } from './front-office.actions';

@Injectable()
export class FrontOfficeStore {
  constructor(private appStore: AppStore, private store: Store<AppState>) {}

  public getFrontOfficeState(): Observable<FrontOfficeState> {
    return this.appStore.getAppState().pipe(map(state => state.frontOfficeState));
  }

  public retrieve() {
    this.store.dispatch(new Retrieve());
  }
}
