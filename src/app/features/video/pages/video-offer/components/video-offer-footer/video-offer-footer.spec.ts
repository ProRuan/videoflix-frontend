import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOfferFooter } from './video-offer-footer';

describe('VideoOfferFooter', () => {
  let component: VideoOfferFooter;
  let fixture: ComponentFixture<VideoOfferFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoOfferFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoOfferFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
