import { TestBed } from '@angular/core/testing';

import { AuthResolver } from './auth-resolver';

describe('AuthResolver', () => {
  let service: AuthResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
