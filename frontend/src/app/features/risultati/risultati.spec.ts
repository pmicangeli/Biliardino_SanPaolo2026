import { TestBed } from '@angular/core/testing';

import { Risultati } from './risultati';

describe('Risultati', () => {
  let service: Risultati;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Risultati);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
