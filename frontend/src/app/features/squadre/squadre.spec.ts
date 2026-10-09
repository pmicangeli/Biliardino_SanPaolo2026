import { TestBed } from '@angular/core/testing';

import { Squadre } from './squadre';

describe('Squadre', () => {
  let service: Squadre;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Squadre);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
