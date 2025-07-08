import { TestBed } from '@angular/core/testing';

import { Videoflix } from './videoflix';

describe('Videoflix', () => {
  let service: Videoflix;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Videoflix);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
