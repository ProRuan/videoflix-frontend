import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tokenErrorGuard } from './token-error-guard';

describe('tokenErrorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tokenErrorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
