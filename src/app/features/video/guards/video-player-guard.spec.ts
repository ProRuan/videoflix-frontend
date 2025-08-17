import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { videoPlayerGuard } from './video-player-guard';

describe('videoPlayerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => videoPlayerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
