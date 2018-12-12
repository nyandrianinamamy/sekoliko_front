import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzAjoutClasseComponent } from './tz-ajout-classe.component';

describe('TzAjoutClasseComponent', () => {
  let component: TzAjoutClasseComponent;
  let fixture: ComponentFixture<TzAjoutClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzAjoutClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzAjoutClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
