import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzAjoutMatiereComponent } from './tz-ajout-matiere.component';

describe('TzAjoutMatiereComponent', () => {
  let component: TzAjoutMatiereComponent;
  let fixture: ComponentFixture<TzAjoutMatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzAjoutMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzAjoutMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
