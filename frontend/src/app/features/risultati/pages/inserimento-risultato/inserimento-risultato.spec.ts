import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserimentoRisultato } from './inserimento-risultato';

describe('InserimentoRisultato', () => {
  let component: InserimentoRisultato;
  let fixture: ComponentFixture<InserimentoRisultato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserimentoRisultato],
    }).compileComponents();

    fixture = TestBed.createComponent(InserimentoRisultato);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
