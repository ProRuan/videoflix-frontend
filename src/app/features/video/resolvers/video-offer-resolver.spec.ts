import { TestBed } from '@angular/core/testing';

import { VideoOfferResolver } from './video-offer-resolver';

describe('VideoOfferResolver', () => {
  let service: VideoOfferResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoOfferResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
