import { TzSkFrontOfficeModule } from './tz-sk-front-officemodule';

describe('SekolikoModule', () => {
  let sekolikoModule: TzSkFrontOfficeModule;

  beforeEach(() => {
    sekolikoModule = new TzSkFrontOfficeModule();
  });

  it('should create an instance', () => {
    expect(sekolikoModule).toBeTruthy();
  });
});
