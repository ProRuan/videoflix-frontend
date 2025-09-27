import { TestBed } from '@angular/core/testing';

import { AuthFormUtils } from './auth-form-utils';

describe('AuthFormUtils', () => {
  let service: AuthFormUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFormUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
