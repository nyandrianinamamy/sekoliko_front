import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzClasseListComponent } from './tz-classe-list.component';

describe('TzClasseListComponent', () => {
  let component: TzClasseListComponent;
  let fixture: ComponentFixture<TzClasseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzClasseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzClasseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
