import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzAnneScolaireComponent } from './tz-anne-scolaire.component';

describe('TzAnneScolaireComponent', () => {
  let component: TzAnneScolaireComponent;
  let fixture: ComponentFixture<TzAnneScolaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzAnneScolaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzAnneScolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
