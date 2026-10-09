import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiocatoriList } from './giocatori-list';

describe('GiocatoriList', () => {
  let component: GiocatoriList;
  let fixture: ComponentFixture<GiocatoriList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiocatoriList],
    }).compileComponents();

    fixture = TestBed.createComponent(GiocatoriList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
