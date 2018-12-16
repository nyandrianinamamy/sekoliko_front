import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzPayementsAjoutComponent } from './tz-payements-ajout.component';

describe('TzPayementsAjoutComponent', () => {
  let component: TzPayementsAjoutComponent;
  let fixture: ComponentFixture<TzPayementsAjoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzPayementsAjoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzPayementsAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
