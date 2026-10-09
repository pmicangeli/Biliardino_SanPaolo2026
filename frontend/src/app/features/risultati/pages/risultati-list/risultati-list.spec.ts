import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisultatiList } from './risultati-list';

describe('RisultatiList', () => {
  let component: RisultatiList;
  let fixture: ComponentFixture<RisultatiList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RisultatiList],
    }).compileComponents();

    fixture = TestBed.createComponent(RisultatiList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
