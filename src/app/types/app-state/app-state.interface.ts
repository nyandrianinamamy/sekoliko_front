import { AuthenticationState } from '../../features/authentication/types/authentication-state/authentication-state.interface';
import { FrontOfficeState } from '../../features/front-office/types/front-office-state/front-office-state.interface';
import { SharedState } from '../../modules/shared/types/shared-state/shared-state.interface';

export interface AppState {
  frontOfficeState: FrontOfficeState;
  authenticationState: AuthenticationState;
  sharedState: SharedState;
}
