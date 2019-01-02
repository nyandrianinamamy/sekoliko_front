import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzUserComponent } from './tz-user.component';

describe('TzUserComponent', () => {
  let component: TzUserComponent;
  let fixture: ComponentFixture<TzUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
