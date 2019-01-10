import { TzSkFrontOfficeModule } from './tz-sk-front-office.module';

describe('SekolikoModule', () => {
  let sekolikoModule: TzSkFrontOfficeModule;

  beforeEach(() => {
    sekolikoModule = new TzSkFrontOfficeModule();
  });

  it('should create an instance', () => {
    expect(sekolikoModule).toBeTruthy();
  });
});
