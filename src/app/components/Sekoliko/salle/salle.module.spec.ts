import { SalleModule } from './salle.module';

describe('SalleModule', () => {
  let salleModule: SalleModule;

  beforeEach(() => {
    salleModule = new SalleModule();
  });

  it('should create an instance', () => {
    expect(salleModule).toBeTruthy();
  });
});
