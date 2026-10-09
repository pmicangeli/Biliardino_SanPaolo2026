import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitaDetail } from './partita-detail';

describe('PartitaDetail', () => {
  let component: PartitaDetail;
  let fixture: ComponentFixture<PartitaDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartitaDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(PartitaDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
