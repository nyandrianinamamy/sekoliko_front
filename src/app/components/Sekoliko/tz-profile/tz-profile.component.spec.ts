import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzProfileComponent } from './tz-profile.component';

describe('TzProfileComponent', () => {
  let component: TzProfileComponent;
  let fixture: ComponentFixture<TzProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
