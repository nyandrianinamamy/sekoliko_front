import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzInscriptionComponent } from './tz-inscription.component';

describe('TzInscriptionComponent', () => {
  let component: TzInscriptionComponent;
  let fixture: ComponentFixture<TzInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzInscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
