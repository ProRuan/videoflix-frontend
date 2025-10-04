import { TestBed } from '@angular/core/testing';

import { VideoPlayerFacade } from './video-player-facade';

describe('VideoPlayerFacade', () => {
  let service: VideoPlayerFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoPlayerFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
