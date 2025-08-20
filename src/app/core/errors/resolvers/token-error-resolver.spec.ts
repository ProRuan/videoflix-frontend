import { TestBed } from '@angular/core/testing';

import { TokenErrorResolver } from './token-error-resolver';

describe('TokenErrorResolver', () => {
  let service: TokenErrorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenErrorResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
