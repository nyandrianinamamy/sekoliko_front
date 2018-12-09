import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzAjoutSalleComponent } from './tz-ajout-salle.component';

describe('TzAjoutSalleComponent', () => {
  let component: TzAjoutSalleComponent;
  let fixture: ComponentFixture<TzAjoutSalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzAjoutSalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzAjoutSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
