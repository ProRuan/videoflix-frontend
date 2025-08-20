import { TestBed } from '@angular/core/testing';

import { TokenResolver } from './token-resolver';

describe('TokenResolver', () => {
  let service: TokenResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
