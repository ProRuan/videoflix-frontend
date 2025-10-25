import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerTouchControl } from './video-player-touch-control';

describe('VideoPlayerTouchControl', () => {
  let component: VideoPlayerTouchControl;
  let fixture: ComponentFixture<VideoPlayerTouchControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPlayerTouchControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPlayerTouchControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
