import { FrontOfficeState } from './front-office-state.interface';

describe('FrontOfficeState', () => {
  let frontOfficeState: FrontOfficeState;

  describe('when the FrontOfficeState is in a certain state', () => {
    beforeEach(() => {
      frontOfficeState = {} as FrontOfficeState;
    });

    it('should be true', () => {
      expect(frontOfficeState).toEqual({} as FrontOfficeState);
    });
  });
});
