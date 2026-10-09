import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioPartite } from './calendario-partite';

describe('CalendarioPartite', () => {
  let component: CalendarioPartite;
  let fixture: ComponentFixture<CalendarioPartite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioPartite],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarioPartite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
