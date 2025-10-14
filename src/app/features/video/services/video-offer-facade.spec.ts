import { TestBed } from '@angular/core/testing';

import { VideoOfferFacade } from './video-offer-facade';

describe('VideoOfferFacade', () => {
  let service: VideoOfferFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoOfferFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
