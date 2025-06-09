import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOffer } from './video-offer';

describe('VideoOffer', () => {
  let component: VideoOffer;
  let fixture: ComponentFixture<VideoOffer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoOffer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoOffer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
