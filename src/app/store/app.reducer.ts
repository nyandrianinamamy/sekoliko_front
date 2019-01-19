import {
  createFeatureSelector,
  createSelector,
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import { sharedReducer } from '../modules/shared/store/shared.reducer';
import { AppState } from '../types/app-state/app-state.interface';

export const reducers: ActionReducerMap<AppState> = { sharedState: sharedReducer };

export const metaReducers: Array<MetaReducer<AppState>> = !environment.production ? [] : [];
