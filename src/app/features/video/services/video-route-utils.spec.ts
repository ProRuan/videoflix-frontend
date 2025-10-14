import { TestBed } from '@angular/core/testing';

import { VideoRouteUtils } from './video-route-utils';

describe('VideoRouteUtils', () => {
  let service: VideoRouteUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoRouteUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
