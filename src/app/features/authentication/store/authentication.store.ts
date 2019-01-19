import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/types/app-state/app-state.interface';

import { AppStore } from '../../../store/app.store';
import { AuthenticationState } from '../types/authentication-state/authentication-state.interface';

import { Retrieve } from './authentication.actions';

@Injectable()
export class AuthenticationStore {
  constructor(private appStore: AppStore, private store: Store<AppState>) {}

  public getAuthenticationState(): Observable<AuthenticationState> {
    return this.appStore.getAppState().pipe(map(state => state.authenticationState));
  }

  public retrieve() {
    this.store.dispatch(new Retrieve());
  }
}
