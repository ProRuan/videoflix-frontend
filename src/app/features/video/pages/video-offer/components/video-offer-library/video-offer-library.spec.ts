import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOfferLibrary } from './video-offer-library';

describe('VideoOfferLibrary', () => {
  let component: VideoOfferLibrary;
  let fixture: ComponentFixture<VideoOfferLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoOfferLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoOfferLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
