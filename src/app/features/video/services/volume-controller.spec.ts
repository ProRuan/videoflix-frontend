import { TestBed } from '@angular/core/testing';

import { VolumeController } from './volume-controller';

describe('VolumeController', () => {
  let service: VolumeController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolumeController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
