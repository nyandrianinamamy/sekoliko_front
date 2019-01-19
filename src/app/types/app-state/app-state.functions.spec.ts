import { AppState } from './app-state.interface';

describe('AppState', () => {
  let appState: AppState;

  describe('when the AppState is in a certain state', () => {
    beforeEach(() => {
      appState = {} as AppState;
    });

    it('should be true', () => {
      expect(appState).toEqual({} as AppState);
    });
  });
});