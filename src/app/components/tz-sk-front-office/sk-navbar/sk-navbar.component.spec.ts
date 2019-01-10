import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkNavbarComponent } from './sk-navbar.component';

describe('SkNavbarComponent', () => {
  let component: SkNavbarComponent;
  let fixture: ComponentFixture<SkNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
