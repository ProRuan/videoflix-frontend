import { TestBed } from '@angular/core/testing';

import { VideoPlayerResolver } from './video-player-resolver';

describe('VideoPlayerResolver', () => {
  let service: VideoPlayerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoPlayerResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
