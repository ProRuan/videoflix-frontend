import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { activationTokenResolver } from './activation-token-resolver';

describe('activationTokenResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => activationTokenResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
