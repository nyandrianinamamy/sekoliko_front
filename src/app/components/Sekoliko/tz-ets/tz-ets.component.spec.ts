import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzEtsComponent } from './tz-ets.component';

describe('TzEtsComponent', () => {
  let component: TzEtsComponent;
  let fixture: ComponentFixture<TzEtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzEtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzEtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
