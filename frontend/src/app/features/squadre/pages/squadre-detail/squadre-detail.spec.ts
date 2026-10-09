import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadreDetail } from './squadre-detail';

describe('SquadreDetail', () => {
  let component: SquadreDetail;
  let fixture: ComponentFixture<SquadreDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadreDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(SquadreDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
