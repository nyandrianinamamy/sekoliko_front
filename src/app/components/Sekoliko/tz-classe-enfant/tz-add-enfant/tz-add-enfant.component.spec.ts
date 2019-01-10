import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzAddEnfantComponent } from './tz-add-enfant.component';

describe('TzAddEnfantComponent', () => {
  let component: TzAddEnfantComponent;
  let fixture: ComponentFixture<TzAddEnfantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzAddEnfantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzAddEnfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
