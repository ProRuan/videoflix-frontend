import { TestBed } from '@angular/core/testing';

import { FullscreenController } from './fullscreen-controller';

describe('FullscreenController', () => {
  let service: FullscreenController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullscreenController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
