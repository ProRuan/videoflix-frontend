import { TestBed } from '@angular/core/testing';

import { AuthErrorHandler } from './auth-error-handler';

describe('AuthErrorHandler', () => {
  let service: AuthErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
