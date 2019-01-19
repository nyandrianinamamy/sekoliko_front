import { createSharedState } from '../../modules/shared/types/shared-state/shared-state.functions';

import { AppState } from './app-state.interface';

export function createAppState(): AppState {
  return { sharedState: createSharedState() };
}
