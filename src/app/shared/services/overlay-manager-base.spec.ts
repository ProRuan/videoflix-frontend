import { TestBed } from '@angular/core/testing';

import { OverlayManagerBase } from './overlay-manager-base';

describe('OverlayManagerBase', () => {
  let service: OverlayManagerBase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayManagerBase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
