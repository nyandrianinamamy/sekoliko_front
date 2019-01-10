import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzSkFrontOfficeComponent } from './tz-sk-front-office.component';

describe('TzSkFrontOfficeComponent', () => {
  let component: TzSkFrontOfficeComponent;
  let fixture: ComponentFixture<TzSkFrontOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzSkFrontOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzSkFrontOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
