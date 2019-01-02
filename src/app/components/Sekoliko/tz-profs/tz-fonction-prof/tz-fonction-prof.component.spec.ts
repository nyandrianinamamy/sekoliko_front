import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TzFonctionProfComponent } from './tz-fonction-prof.component';

describe('TzFonctionProfComponent', () => {
  let component: TzFonctionProfComponent;
  let fixture: ComponentFixture<TzFonctionProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TzFonctionProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TzFonctionProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
