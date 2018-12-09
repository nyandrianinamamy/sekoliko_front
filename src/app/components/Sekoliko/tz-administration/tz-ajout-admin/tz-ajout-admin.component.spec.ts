import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzAjoutAdminComponent } from './tz-ajout-admin.component';

describe('TzAjoutAdminComponent', () => {
  let component: TzAjoutAdminComponent;
  let fixture: ComponentFixture<TzAjoutAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzAjoutAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzAjoutAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
