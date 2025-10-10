import { TestBed } from '@angular/core/testing';

import { PlaybackRateController } from './playback-rate-controller';

describe('PlaybackRateController', () => {
  let service: PlaybackRateController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaybackRateController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
