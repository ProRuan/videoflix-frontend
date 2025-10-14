import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOfferHeader } from './video-offer-header';

describe('VideoOfferHeader', () => {
  let component: VideoOfferHeader;
  let fixture: ComponentFixture<VideoOfferHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoOfferHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoOfferHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
