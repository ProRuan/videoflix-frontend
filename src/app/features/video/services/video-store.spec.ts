import { TestBed } from '@angular/core/testing';

import { VideoStore } from './video-store';

describe('VideoStore', () => {
  let service: VideoStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
