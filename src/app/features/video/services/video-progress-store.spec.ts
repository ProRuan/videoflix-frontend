import { TestBed } from '@angular/core/testing';

import { VideoProgressStore } from './video-progress-store';

describe('VideoProgressStore', () => {
  let service: VideoProgressStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoProgressStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
