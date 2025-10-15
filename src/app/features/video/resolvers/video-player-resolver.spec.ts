import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { videoPlayerResolver } from './video-player-resolver';

describe('videoPlayerResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => videoPlayerResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
