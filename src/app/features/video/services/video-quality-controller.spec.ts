import { TestBed } from '@angular/core/testing';

import { VideoQualityController } from './video-quality-controller';

describe('VideoQualityController', () => {
  let service: VideoQualityController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoQualityController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
