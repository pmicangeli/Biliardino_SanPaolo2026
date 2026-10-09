import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadreList } from './squadre-list';

describe('SquadreList', () => {
  let component: SquadreList;
  let fixture: ComponentFixture<SquadreList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadreList],
    }).compileComponents();

    fixture = TestBed.createComponent(SquadreList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
