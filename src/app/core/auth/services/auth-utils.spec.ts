import { TestBed } from '@angular/core/testing';

import { AuthUtils } from './auth-utils';

describe('AuthUtils', () => {
  let service: AuthUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
