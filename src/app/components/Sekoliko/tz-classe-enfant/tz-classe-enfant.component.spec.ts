import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzClasseEnfantComponent } from './tz-classe-enfant.component';

describe('TzClasseEnfantComponent', () => {
  let component: TzClasseEnfantComponent;
  let fixture: ComponentFixture<TzClasseEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzClasseEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzClasseEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
