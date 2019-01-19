import { createAuthenticationState } from '../../features/authentication/types/authentication-state/authentication-state.functions';
import { createFrontOfficeState } from '../../features/front-office/types/front-office-state/front-office-state.functions';
import { createSharedState } from '../../modules/shared/types/shared-state/shared-state.functions';

import { AppState } from './app-state.interface';

export function createAppState(): AppState {
  return {
    frontOfficeState: createFrontOfficeState(),
    authenticationState: createAuthenticationState(),
    sharedState: createSharedState()
  };
}
