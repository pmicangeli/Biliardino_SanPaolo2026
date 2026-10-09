import { TestBed } from '@angular/core/testing';

import { Partite } from './partite';

describe('Partite', () => {
  let service: Partite;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Partite);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
