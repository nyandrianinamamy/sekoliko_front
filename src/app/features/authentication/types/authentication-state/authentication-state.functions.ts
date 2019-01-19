import { AuthenticationState } from './authentication-state.interface';

export function createAuthenticationState(): AuthenticationState {
  return {
    removeMe: null
  };
}
