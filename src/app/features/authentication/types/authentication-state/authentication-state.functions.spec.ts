import { AuthenticationState } from './authentication-state.interface';

describe('AuthenticationState', () => {
  let authenticationState: AuthenticationState;

  describe('when the AuthenticationState is in a certain state', () => {
    beforeEach(() => {
      authenticationState = {} as AuthenticationState;
    });

    it('should be true', () => {
      expect(authenticationState).toEqual({} as AuthenticationState);
    });
  });
});
