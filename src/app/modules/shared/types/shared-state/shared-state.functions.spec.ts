import { SharedState } from './shared-state.interface';

describe('SharedState', () => {
  let sharedState: SharedState;

  describe('when the SharedState is in a certain state', () => {
    beforeEach(() => {
      sharedState = {} as SharedState;
    });

    it('should be true', () => {
      expect(sharedState).toEqual({} as SharedState);
    });
  });
});
