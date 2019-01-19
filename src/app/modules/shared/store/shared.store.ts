import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/types/app-state/app-state.interface';

import { AppStore } from '../../../store/app.store';
import { SharedState } from '../types/shared-state/shared-state.interface';

import { Retrieve } from './shared.actions';

@Injectable()
export class SharedStore {
  constructor(private appStore: AppStore, private store: Store<AppState>) {}

  public getSharedState(): Observable<SharedState> {
    return this.appStore.getAppState().pipe(map(state => state.sharedState));
  }

  public retrieve() {
    this.store.dispatch(new Retrieve());
  }
}
