import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalInterfaceComponent } from './principal-interface.component';

describe('PrincipalInterfaceComponent', () => {
  let component: PrincipalInterfaceComponent;
  let fixture: ComponentFixture<PrincipalInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
