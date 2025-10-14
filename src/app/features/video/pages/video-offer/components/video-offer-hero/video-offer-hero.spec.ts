import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOfferHero } from './video-offer-hero';

describe('VideoOfferHero', () => {
  let component: VideoOfferHero;
  let fixture: ComponentFixture<VideoOfferHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoOfferHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoOfferHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
