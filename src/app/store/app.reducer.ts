import {
  createFeatureSelector,
  createSelector,
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import { authenticationReducer } from '../features/authentication/store/authentication.reducer';
import { frontOfficeReducer } from '../features/front-office/store/front-office.reducer';
import { sharedReducer } from '../modules/shared/store/shared.reducer';
import { AppState } from '../types/app-state/app-state.interface';

export const reducers: ActionReducerMap<AppState> = {
  frontOfficeState: frontOfficeReducer,
  authenticationState: authenticationReducer,
  sharedState: sharedReducer
};

export const metaReducers: Array<MetaReducer<AppState>> = !environment.production ? [] : [];
