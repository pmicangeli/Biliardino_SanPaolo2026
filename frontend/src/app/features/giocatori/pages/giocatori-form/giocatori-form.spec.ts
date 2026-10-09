import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiocatoriForm } from './giocatori-form';

describe('GiocatoriForm', () => {
  let component: GiocatoriForm;
  let fixture: ComponentFixture<GiocatoriForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiocatoriForm],
    }).compileComponents();

    fixture = TestBed.createComponent(GiocatoriForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
