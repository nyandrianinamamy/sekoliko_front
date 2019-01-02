import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzEdtComponent } from './tz-edt.component';

describe('TzEdtComponent', () => {
  let component: TzEdtComponent;
  let fixture: ComponentFixture<TzEdtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzEdtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzEdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
